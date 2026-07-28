"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A Three.js armillary/gyroscope for the hero: eight concentric rings, each
 * twinned with a ring of the same size pitched 90° about X. Every pair but the
 * outermost turns about its own axis while its twin sweeps through — a gyroscope
 * caged around
 * a central Earth. The whole armature is then tilted off-axis so the rings
 * read as ellipses rather than as concentric circles.
 */

const OLIVE = 0x969d74;
const ROSE = 0xc98f8f;
const PALE_GOLD = 0xdec179;

// Pitch applied to the second ring of every pair.
const TWIN_PITCH = Math.PI / 2; // 90°

// Static tilt of the whole armature. Three's default Euler order is XYZ, and
// with y = 0 that composes as Rx·Rz — i.e. pitch about X first, then roll about
// the already-pitched Z, which is the order these two were specified in.
const TILT_X = THREE.MathUtils.degToRad(15);
const TILT_Z = THREE.MathUtils.degToRad(10);

type BandColors = [number] | [number, number]; // one color = solid, two = dashed

type RingSpec = {
  radius: number;
  width: number;
  spin: number; // rad/s of the pair about the view axis
  colors: BandColors; // the camera-facing band
  twinColors?: BandColors; // the pitched twin; defaults to `colors`
  segments?: number;
};

// Outermost (Sphæra Zodiaci) to innermost (Sphæra Lunæ)
const RINGS: RingSpec[] = [
  {
    radius: 3.05,
    width: 0.34,
    spin: 0, // stationary — the outermost sphere holds still while the rest turn
    colors: [ROSE, PALE_GOLD],
    twinColors: [ROSE, OLIVE],
    segments: 24,
  },
  { radius: 2.72, width: 0.16, spin: -0.060, colors: [PALE_GOLD] },
  { radius: 2.40, width: 0.15, spin: 0.075, colors: [PALE_GOLD] },
  { radius: 2.09, width: 0.14, spin: -0.085, colors: [PALE_GOLD] },
  { radius: 1.79, width: 0.13, spin: 0.100, colors: [PALE_GOLD] },
  { radius: 1.50, width: 0.12, spin: -0.110, colors: [PALE_GOLD] },
  { radius: 1.22, width: 0.11, spin: 0.125, colors: [PALE_GOLD] },
  { radius: 0.95, width: 0.10, spin: -0.135, colors: [PALE_GOLD] },
];

const OUTER = Math.max(...RINGS.map((r) => r.radius));

export default function CelestialSpheres() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
    camera.position.set(0, 0.55, 8.4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // Ambient sits lower than the sun on purpose: fill this flat would wash the
    // cast shadows back out of the picture.
    scene.add(new THREE.AmbientLight(0xfff2dc, 0.6));
    const sun = new THREE.DirectionalLight(0xffe6bf, 2.4);
    sun.position.set(5, 7, 9);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    // The light sits ~12.5 units out; the armillary is ~4.5 across at full fit.
    sun.shadow.camera.near = 5;
    sun.shadow.camera.far = 22;
    // The eight unpitched bands are all coplanar, so each samples the shadow
    // map at its own stored depth. Without these two it reads as uniform acne.
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.03;
    scene.add(sun);
    const glow = new THREE.PointLight(0xd8a94e, 6, 14, 1.6);
    glow.position.set(0, 0.4, 3.4);
    scene.add(glow);

    // `world` carries the drift offset and the fit scale; `armature` nests
    // inside it and carries nothing but the static tilt, so the two concerns
    // never have to be composed by hand.
    const world = new THREE.Group();
    scene.add(world);

    const armature = new THREE.Group();
    armature.rotation.set(TILT_X, 0, TILT_Z);
    world.add(armature);

    // --- rings ---
    // One flat annular band. Segmented specs alternate two colours around the
    // circumference, which is what reads as the dashed outermost sphere.
    const buildBand = (spec: RingSpec, colors: BandColors) => {
      const band = new THREE.Group();
      const inner = spec.radius - spec.width;

      const shadowed = (mesh: THREE.Mesh) => {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
      };

      if (colors.length === 2 && spec.segments) {
        const step = (Math.PI * 2) / spec.segments;
        for (let s = 0; s < spec.segments; s++) {
          const geo = new THREE.RingGeometry(
            inner,
            spec.radius,
            12,
            1,
            s * step,
            step
          );
          const mat = new THREE.MeshStandardMaterial({
            color: colors[s % 2],
            roughness: 0.55,
            metalness: 0.2,
            side: THREE.DoubleSide,
            shadowSide: THREE.DoubleSide,
          });
          band.add(shadowed(new THREE.Mesh(geo, mat)));
        }
      } else {
        const geo = new THREE.RingGeometry(inner, spec.radius, 96, 1);
        const mat = new THREE.MeshStandardMaterial({
          color: colors[0],
          roughness: 0.5,
          metalness: 0.25,
          side: THREE.DoubleSide,
          shadowSide: THREE.DoubleSide,
        });
        band.add(shadowed(new THREE.Mesh(geo, mat)));
      }

      // gilt edges give the flat bands an engraved definition
      const edgeMat = new THREE.MeshStandardMaterial({
        color: 0xa9853c,
        roughness: 0.35,
        metalness: 0.6,
      });
      for (const r of [inner, spec.radius]) {
        band.add(
          shadowed(
            new THREE.Mesh(new THREE.TorusGeometry(r, 0.008, 6, 128), edgeMat)
          )
        );
      }

      return band;
    };

    // Each sphere is a pair: one band plus a twin of the same radius pitched
    // 90° about X, the two turning together about the pair's own Z.
    const pairs: { pivot: THREE.Group; spec: RingSpec }[] = [];

    for (const spec of RINGS) {
      const pivot = new THREE.Group();

      pivot.add(buildBand(spec, spec.colors));

      const twin = buildBand(spec, spec.twinColors ?? spec.colors);
      twin.rotation.x = TWIN_PITCH;
      pivot.add(twin);

      armature.add(pivot);
      pairs.push({ pivot, spec });
    }

    // --- central Earth ---
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 48, 32),
      new THREE.MeshStandardMaterial({
        color: 0xd9c8a0,
        roughness: 0.85,
        metalness: 0.05,
      })
    );
    earth.castShadow = true;
    earth.receiveShadow = true;
    armature.add(earth);
    const meridian = new THREE.Mesh(
      new THREE.TorusGeometry(0.345, 0.006, 6, 96),
      new THREE.MeshStandardMaterial({
        color: 0xa9853c,
        roughness: 0.4,
        metalness: 0.6,
      })
    );
    meridian.rotation.x = Math.PI / 2.4;
    meridian.castShadow = true;
    meridian.receiveShadow = true;
    armature.add(meridian);

    // --- faint golden stars ---
    const starCount = 140;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = -Math.abs(r * Math.cos(phi)) - 1;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        color: 0xe8c877,
        size: 0.035,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
      })
    );
    scene.add(stars);

    // --- sizing ---
    // Half-angle (as a tangent) subtended by a ring of world-radius R, at its
    // worst orientation. Perspective makes the near arc of a tilted ring bulge
    // past its flat-on size, so the widest point rides at z = R²/D rather than
    // z = 0 — that bulge is what used to get sliced off by the canvas edge.
    // A ring is centred on the origin, so this bound holds under any tilt.
    const projected = (R: number) => {
      const D = camera.position.length();
      const z = Math.min((R * R) / D, R * 0.999);
      return Math.sqrt(Math.max(R * R - z * z, 0)) / (D - z);
    };

    // Worst-case pointer-parallax offset, in world units — the fit has to hold
    // at full drift, not just at rest.
    const DRIFT = Math.hypot(0.22, 0.16);

    // Largest uniform scale whose outermost ring still clears the frame.
    const fitScale = (aspect: number) => {
      const tanHalf = Math.tan((camera.fov * Math.PI) / 360);
      const limit =
        tanHalf * Math.min(1, aspect) * 0.94 - // 6% breathing room
        DRIFT / camera.position.length();
      let lo = 0.05;
      let hi = 1.35;
      if (projected(OUTER * hi) <= limit) return hi;
      for (let i = 0; i < 22; i++) {
        const mid = (lo + hi) / 2;
        if (projected(OUTER * mid) <= limit) lo = mid;
        else hi = mid;
      }
      return lo;
    };

    // The shadow frustum tracks the fitted size rather than sitting at a fixed
    // worst case, so narrow viewports spend their 2048² on a smaller armillary
    // instead of on empty margin.
    const fitShadowCamera = (scale: number) => {
      const extent = OUTER * scale + DRIFT + 0.2;
      const shadowCam = sun.shadow.camera;
      shadowCam.left = -extent;
      shadowCam.right = extent;
      shadowCam.top = extent;
      shadowCam.bottom = -extent;
      shadowCam.updateProjectionMatrix();
    };

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const scale = fitScale(camera.aspect);
      world.scale.setScalar(scale);
      fitShadowCamera(scale);
      if (reducedMotion) renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    // --- pointer parallax ---
    // Translation only. The armature's tilt is fixed by TILT_X/TILT_Z; letting
    // the pointer rock it as well would read as two competing motions.
    let targetX = 0;
    let targetY = 0;
    const onPointer = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.22;
      targetY = -(e.clientY / window.innerHeight - 0.5) * 0.16;
    };
    if (!reducedMotion) window.addEventListener("pointermove", onPointer);

    // --- animation loop, paused offscreen/hidden ---
    let raf = 0;
    let visible = true;
    let driftX = 0;
    let driftY = 0;
    const timer = new THREE.Timer();

    const frame = (timestamp?: number) => {
      raf = requestAnimationFrame(frame);
      timer.update(timestamp);
      const dt = Math.min(timer.getDelta(), 0.05);
      const t = timer.getElapsed();

      driftX += (targetX - driftX) * 0.03;
      driftY += (targetY - driftY) * 0.03;
      world.position.set(driftX, driftY, 0);

      for (const { pivot, spec } of pairs) {
        pivot.rotation.z += spec.spin * dt;
      }
      stars.rotation.y = t * 0.004;

      renderer.render(scene, camera);
    };

    const start = () => {
      if (!raf && visible && !document.hidden && !reducedMotion) {
        timer.reset();
        frame();
      }
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        start();
      } else {
        stop();
      }
    });
    io.observe(mount);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    if (reducedMotion) {
      renderer.render(scene, camera);
    } else {
      start();
    }

    return () => {
      stop();
      timer.dispose();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material)
            ? obj.material
            : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="spheres-canvas" aria-hidden="true" />;
}
