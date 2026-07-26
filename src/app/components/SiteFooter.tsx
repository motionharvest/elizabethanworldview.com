import { BUY_URL } from "../site-config";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <p className="eyebrow">Out now from Bloomsbury</p>
          <h2>Shakespeare&apos;s World</h2>
          <p className="site-footer__dek">
            Seeing the Plays Through Elizabethan Eyes, by Dennis Krausnick,
            Josh Lubarr &amp; Rebecca Goodheart.
          </p>
        </div>
        <a
          className="button button--primary site-footer__buy"
          href={BUY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy now
        </a>
      </div>
    </footer>
  );
}
