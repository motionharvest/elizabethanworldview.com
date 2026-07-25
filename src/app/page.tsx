import Image from "next/image";
import CelestialSpheres from "./components/CelestialSpheres";

const lenses = [
  {
    title: "The Cosmos",
    body: "What filled the heavens in 1600? The book explores a spherical universe with humanity at its center, opening fresh readings of Antony & Cleopatra, King John, and Romeo & Juliet.",
    image: "/images/cover.jpg",
    alt: "Book cover featuring Elizabethan celestial spheres",
  },
  {
    title: "The Great Chain of Being",
    body: "What if everything in existence had a rightful place? See how Shakespeare's plots often turn on the breaking, and restoration, of cosmic order.",
    image: "/images/great-chain.jpg",
    alt: "Historic image illustrating the great chain of being",
  },
  {
    title: "Human Bodies & Humors",
    body: "Step into early modern physiology, where body, mind, and spirit were inseparable. A practical lens for actors shaping character from the inside out.",
    image: "/images/four-humors.jpg",
    alt: "Illustration associated with the four humors",
  },
  {
    title: "Correspondences",
    body: "Everything connects in the Elizabethan imagination. The plays' poetry becomes newly vivid when kings can be roses and lovers can be oysters.",
    image: "/images/chain-ladder.jpg",
    alt: "Allegorical image representing correspondences across the chain of being",
  },
];

const workshopTopics = [
  "The Cosmos",
  "The Great Chain of Being",
  "Human Bodies",
  "Correspondences",
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__inner container">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--authors">
              Dennis Krausnick, Josh Lubarr &amp; Rebecca Goodheart
            </p>
            <h1>
              Shakespeare&apos;s World
              <span>Seeing the Plays Through Elizabethan Eyes</span>
            </h1>
            <p className="hero__dek">
              A fascinating, readable distillation of Dennis Krausnick&apos;s
              actor-training legacy at Shakespeare &amp; Company, with practical
              notes for every Shakespeare play.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#book">
                Explore the book
              </a>
              <a className="button button--ghost" href="#workshops">
                View workshop series
              </a>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <CelestialSpheres />
            <figure className="hero__cover">
              <Image
                src="/images/cover.jpg"
                alt=""
                width={540}
                height={810}
                priority
                sizes="(max-width: 960px) 40vw, 280px"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="section section--light" id="book">
        <div className="container two-col">
          <div>
            <p className="eyebrow">About the Book</p>
            <h2>Recover the worldview behind the words.</h2>
            <p>
              Elizabethan England was not only different in language, politics,
              or technology. The era held a fundamentally different model of the
              universe, of society, and of the human body itself.
            </p>
            <p>
              <em>Shakespeare&apos;s World</em> gives performers, directors,
              educators, and curious readers an engaging tour through these
              foundational ideas, from the four elements and bodily humors to
              the great chain of being, and shows how this worldview permeates
              each play.
            </p>
          </div>
          <figure className="feature-image">
            <Image
              src="/images/stage-cleopatra.jpg"
              alt="Theatrical image from a Shakespeare production"
              width={1600}
              height={2409}
              sizes="(max-width: 960px) 100vw, 45vw"
            />
          </figure>
        </div>
      </section>

      <section className="section section--parchment" id="lenses">
        <div className="container">
          <p className="eyebrow">Four Lenses</p>
          <h2>How the book helps readers and practitioners see differently</h2>
          <div className="lens-grid">
            {lenses.map((lens) => (
              <article className="lens-card" key={lens.title}>
                <Image
                  src={lens.image}
                  alt={lens.alt}
                  width={1200}
                  height={900}
                  sizes="(max-width: 960px) 100vw, 25vw"
                />
                <div className="lens-card__body">
                  <h3>{lens.title}</h3>
                  <p>{lens.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark" id="lineage">
        <div className="container">
          <p className="eyebrow">Lineage</p>
          <h2>From Shakespeare &amp; Company&apos;s training room to the page</h2>
          <p className="max-copy">
            For decades, Dennis Krausnick brought Elizabethan worldview training
            to life in the world-renowned Month-Long Intensive at
            Shakespeare&nbsp;&amp;&nbsp;Company in Lenox, Massachusetts. This book
            distills that immersive teaching tradition for a wider audience.
          </p>
          <div className="stage-strip">
            <Image
              src="/images/stage-comedy.jpg"
              alt="Stage moment from a Shakespeare comedy"
              width={1600}
              height={1335}
              sizes="(max-width: 960px) 100vw, 33vw"
            />
            <Image
              src="/images/stage-othello.jpg"
              alt="Stage moment from a Shakespeare tragedy"
              width={1600}
              height={2409}
              sizes="(max-width: 960px) 100vw, 33vw"
            />
            <Image
              src="/images/stage-cleopatra.jpg"
              alt="Stage moment from Antony and Cleopatra"
              width={1600}
              height={2409}
              sizes="(max-width: 960px) 100vw, 33vw"
            />
          </div>
        </div>
      </section>

      <section className="section section--light" id="authors">
        <div className="container">
          <p className="eyebrow">Authors</p>
          <h2>Teachers, artists, and lifelong Shakespeare practitioners</h2>
          <div className="author-grid">
            <article className="author-card">
              <div className="author-card__placeholder">DK</div>
              <h3>Dennis Krausnick</h3>
              <p>
                Beloved classical acting teacher and former Director of Training
                at Shakespeare &amp; Company (1942–2018), whose immersive
                worldview work shaped generations of performers.
              </p>
            </article>
            <article className="author-card">
              <Image
                src="/images/josh-lubarr.jpg"
                alt="Josh Lubarr"
                width={553}
                height={559}
                sizes="(max-width: 960px) 100vw, 30vw"
              />
              <h3>Josh Lubarr</h3>
              <p>
                Writer and longtime Shakespeare student with a focus on what the
                plays reveal about ourselves and the universe; collaborator on
                multiple Shakespeare productions.
              </p>
            </article>
            <article className="author-card">
              <Image
                src="/images/rebecca-goodheart.jpg"
                alt="Rebecca Goodheart"
                width={1600}
                height={1068}
                sizes="(max-width: 960px) 100vw, 30vw"
              />
              <h3>Rebecca Goodheart</h3>
              <p>
                Producing Artistic Director of Elm Shakespeare Company,
                designated Linklater voice teacher, director, actor, and
                published scholar in Shakespeare performance.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--parchment" id="workshops">
        <div className="container two-col">
          <div>
            <p className="eyebrow">Companion Workshops</p>
            <h2>Four evenings with Rebecca Goodheart</h2>
            <p>
              A discussion and performance series exploring how Shakespeare and
              his audience understood the world, and what that perspective can
              still unlock for us today.
            </p>
            <ul className="topic-list">
              {workshopTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
          <figure className="feature-image">
            <Image
              src="/images/cover.jpg"
              alt="Shakespeare's World book cover"
              width={540}
              height={810}
              sizes="(max-width: 960px) 100vw, 40vw"
            />
          </figure>
        </div>
      </section>

      <footer className="section section--dark footer-cta">
        <div className="container">
          <p className="eyebrow">Stay Connected</p>
          <h2>Publication planned for early 2026 from Bloomsbury.</h2>
          <p>
            For event, workshop, and pre-order updates, follow Elm Shakespeare
            Company and Bloomsbury announcements.
          </p>
        </div>
      </footer>
    </main>
  );
}
