"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A Three.js recreation of the Ptolemaic celestial-spheres engraving on the
 * cover of "Shakespeare's World" — nested, tilted annular bands (the spheres
 * of the Moon through the Zodiac) slowly precessing around a central Earth.
 */

const PARCHMENT = 0xe9dcbc;
const GOLD = 0xc9a548;
const SAGE = 0x8a9471;
const ROSE = 0xc98f8f;
const PALE_GOLD = 0xdec179;

type RingSpec = {
  radius: number;
  width: number;
  tiltX: number;
  tiltY: number;
  spin: number; // rad/s around the ring's own axis
  wobble: number; // precession amplitude
  wobbleFreq: number;
  colors: [number] | [number, number]; // one color = solid, two = segmented
  segments?: number;
};

// Outermost (Sphæra Zodiaci) to innermost (Sphæra Lunæ)
const RINGS: RingSpec[] = [
  { radius: 3.05, width: 0.34, tiltX: 0.42, tiltY: 0.10, spin: 0.045, wobble: 0.050, wobbleFreq: 0.11, colors: [ROSE, PARCHMENT], segments: 24 },
  { radius: 2.68, width: 0.18, tiltX: 0.60, tiltY: -0.16, spin: -0.060, wobble: 0.060, wobbleFreq: 0.14, colors: [GOLD] },
  { radius: 2.36, width: 0.17, tiltX: 0.78, tiltY: 0.24, spin: 0.075, wobble: 0.070, wobbleFreq: 0.09, colors: [PALE_GOLD, PARCHMENT], segments: 20 },
  { radius: 2.02, width: 0.15, tiltX: 0.95, tiltY: -0.30, spin: -0.085, wobble: 0.065, wobbleFreq: 0.16, colors: [SAGE] },
  { radius: 1.68, width: 0.19, tiltX: 1.12, tiltY: 0.36, spin: 0.100, wobble: 0.075, wobbleFreq: 0.12, colors: [GOLD, PARCHMENT], segments: 16 },
  { radius: 1.36, width: 0.13, tiltX: 1.28, tiltY: -0.42, spin: -0.110, wobble: 0.070, wobbleFreq: 0.18, colors: [ROSE] },
  { radius: 1.07, width: 0.12, tiltX: 1.44, tiltY: 0.48, spin: 0.125, wobble: 0.080, wobbleFreq: 0.13, colors: [PARCHMENT] },
  { radius: 0.80, width: 0.11, tiltX: 1.58, tiltY: -0.54, spin: -0.135, wobble: 0.085, wobbleFreq: 0.20, colors: [SAGE, PARCHMENT], segments: 12 },
];

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
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xfff2dc, 0.9));
    const sun = new THREE.DirectionalLight(0xffe6bf, 2.1);
    sun.position.set(5, 7, 9);
    scene.add(sun);
    const glow = new THREE.PointLight(0xd8a94e, 6, 14, 1.6);
    glow.position.set(0, 0.4, 3.4);
    scene.add(glow);

    const world = new THREE.Group();
    scene.add(world);

    // --- rings ---
    const pivots: { pivot: THREE.Group; mesh: THREE.Group; spec: RingSpec }[] =
      [];

    for (const spec of RINGS) {
      const pivot = new THREE.Group();
      pivot.rotation.set(spec.tiltX, spec.tiltY, 0);

      const band = new THREE.Group();

      const inner = spec.radius - spec.width;
      if (spec.colors.length === 2 && spec.segments) {
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
            color: spec.colors[s % 2],
            roughness: 0.55,
            metalness: 0.2,
            side: THREE.DoubleSide,
          });
          band.add(new THREE.Mesh(geo, mat));
        }
      } else {
        const geo = new THREE.RingGeometry(inner, spec.radius, 96, 1);
        const mat = new THREE.MeshStandardMaterial({
          color: spec.colors[0],
          roughness: spec.colors[0] === GOLD ? 0.35 : 0.55,
          metalness: spec.colors[0] === GOLD ? 0.55 : 0.18,
          side: THREE.DoubleSide,
        });
        band.add(new THREE.Mesh(geo, mat));
      }

      // gilt edges give the flat bands an engraved definition
      const edgeMat = new THREE.MeshStandardMaterial({
        color: 0xa9853c,
        roughness: 0.35,
        metalness: 0.6,
      });
      for (const r of [inner, spec.radius]) {
        const edge = new THREE.Mesh(
          new THREE.TorusGeometry(r, 0.008, 6, 128),
          edgeMat
        );
        band.add(edge);
      }

      pivot.add(band);
      world.add(pivot);
      pivots.push({ pivot, mesh: band, spec });
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
    world.add(earth);
    const meridian = new THREE.Mesh(
      new THREE.TorusGeometry(0.345, 0.006, 6, 96),
      new THREE.MeshStandardMaterial({
        color: 0xa9853c,
        roughness: 0.4,
        metalness: 0.6,
      })
    );
    meridian.rotation.x = Math.PI / 2.4;
    world.add(meridian);

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
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // keep the whole armature in frame on narrow screens
      const s = Math.min(1, (w / h) * 1.25);
      world.scale.setScalar(s);
      if (reducedMotion) renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    // --- pointer parallax ---
    let targetX = 0;
    let targetY = 0;
    const onPointer = (e: PointerEvent) => {
      targetY = (e.clientX / window.innerWidth - 0.5) * 0.35;
      targetX = (e.clientY / window.innerHeight - 0.5) * 0.25;
    };
    if (!reducedMotion) window.addEventListener("pointermove", onPointer);

    // --- animation loop, paused offscreen/hidden ---
    let raf = 0;
    let visible = true;
    const clock = new THREE.Clock();

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      world.rotation.y += 0.05 * dt;
      world.rotation.y += (targetY - world.rotation.y * 0) * 0; // parallax applied below
      world.rotation.x += ((0.06 + targetX) - world.rotation.x) * 0.03;
      world.rotation.z += ((targetY * 0.5) - world.rotation.z) * 0.03;

      for (const { pivot, mesh, spec } of pivots) {
        mesh.rotation.z += spec.spin * dt;
        pivot.rotation.x =
          spec.tiltX + Math.sin(t * spec.wobbleFreq * Math.PI * 2) * spec.wobble;
        pivot.rotation.y =
          spec.tiltY +
          Math.cos(t * spec.wobbleFreq * Math.PI * 2 + 1.3) * spec.wobble * 0.7;
      }
      stars.rotation.y = t * 0.004;

      renderer.render(scene, camera);
    };

    const start = () => {
      if (!raf && visible && !document.hidden && !reducedMotion) {
        clock.getDelta();
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
