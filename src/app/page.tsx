import Image from "next/image";
import CelestialSpheres from "./components/CelestialSpheres";

const lenses = [
  {
    title: "The Cosmos",
    body: "What filled the heavens in 1600? The book explores a spherical universe with humanity at its center, opening fresh readings of Antony & Cleopatra, King John, and Romeo & Juliet.",
    image: "/images/heliocentric-universe.webp",
    alt: "Heliocentric diagram of the universe from the Elizabethan era",
    width: 559,
    height: 723,
  },
  {
    title: "The Great Chain of Being",
    body: "What if everything in existence had a rightful place? See how Shakespeare's plots often turn on the breaking, and restoration, of cosmic order.",
    image: "/images/great-chain.jpg",
    alt: "Historic image illustrating the great chain of being",
    width: 1011,
    height: 1480,
    compact: true,
  },
  {
    title: "Human Bodies & Humors",
    body: "Step into early modern physiology, where body, mind, and spirit were inseparable. A practical lens for actors shaping character from the inside out.",
    image: "/images/four-humors.jpg",
    alt: "Illustration associated with the four humors",
    width: 1200,
    height: 1577,
    compact: true,
  },
  {
    title: "Correspondences",
    body: "Everything connects in the Elizabethan imagination. The plays' poetry becomes newly vivid when kings can be roses and lovers can be oysters.",
    image: "/images/chain-ladder.jpg",
    alt: "Allegorical image representing correspondences across the chain of being",
    width: 1400,
    height: 1129,
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
              A fascinating, readable distillation of{" "}
              <a
                href="https://shakespeare.org/actor_faculty/dennis-krausnick/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dennis Krausnick&apos;s
              </a>{" "}
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
              Elizabethan England, the society that produced William
              Shakespeare, was dramatically different from the modern world of
              today. This is true not only in the most obvious ways, such as
              language, technology, living standards, and politics, but in the
              ideas and beliefs that shaped Elizabethans&apos; understanding of
              themselves and the world around them. Just as audiences 400 years
              from now will need guidance to understand concepts like &ldquo;the
              American dream&rdquo; or &ldquo;wokeness,&rdquo; an understanding
              of the Elizabethan worldview illuminates Shakespeare&apos;s plays
              in new and surprising ways.
            </p>
            <p>
              A fascinating and readable distillation of the insights developed
              by Dennis Krausnick and Shakespeare &amp; Company,{" "}
              <em>Shakespeare&apos;s World</em>{" "}
              gives performers and directors an engaging tour of the
              Elizabethan worldview, unpacking such
              alien concepts as the four elements, the bodily humors, and the
              great chain of being. Detailed notes for each Shakespeare play
              show how this worldview permeates the text, enriching the
              experience of anyone looking to understand and engage with
              Shakespeare&apos;s writing in a practical, personal, and active
              way.
            </p>
          </div>
          <figure className="feature-image feature-image--compact">
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
          <div className="lens-list">
            {lenses.map((lens, index) => (
              <article className="lens-row" key={lens.title}>
                <figure
                  className={
                    lens.compact
                      ? "lens-row__media lens-row__media--compact"
                      : "lens-row__media"
                  }
                >
                  <Image
                    src={lens.image}
                    alt={lens.alt}
                    width={lens.width}
                    height={lens.height}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </figure>
                <div className="lens-row__body">
                  <span className="lens-row__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
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
            Shakespeare&nbsp;&amp;&nbsp;Company in Lenox, Massachusetts, where actors
            still study the era&apos;s cosmology, physiology, and stagecraft,
            including the direct actor-audience relationship at the heart of
            Elizabethan performance. This book distills that immersive teaching
            tradition, usually reserved for actors training in person over
            weeks, for any performer, director, or curious reader working with
            the plays.
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
              className="stage-strip__img--top"
              src="/images/stage-othello.jpg"
              alt="Stage moment from a Shakespeare tragedy"
              width={1600}
              height={2409}
              sizes="(max-width: 960px) 100vw, 33vw"
            />
            <Image
              className="stage-strip__img--top"
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
              <Image
                src="/images/dennis-krausnick.jpg"
                alt="Dennis Krausnick"
                width={1920}
                height={1920}
                sizes="(max-width: 960px) 100vw, 30vw"
              />
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
    </main>
  );
}
