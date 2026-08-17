import { type FormEvent, useState } from "react";

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saved">("idle");

  function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) return;

    window.localStorage.setItem("polkalady-newsletter-interest", trimmedEmail);
    setStatus("saved");
    setEmail("");
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-copy">
          <p className="section-label">PolkaLady</p>
          <p>All copyrights reserved.</p>
        </div>

        <form className="newsletter-signup" onSubmit={handleNewsletterSubmit}>
          <label htmlFor="newsletter-email">Newsletter</label>
          <div>
            <input
              id="newsletter-email"
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
                setStatus("idle");
              }}
              placeholder="Email address"
              type="email"
              value={email}
              required
            />
            <button type="submit">Subscribe</button>
          </div>
          <p>{status === "saved" ? "Thank you. Newsletter connection is being prepared." : "Occasional notes on digital geography, AI, and visual research."}</p>
        </form>

        <div className="footer-links" aria-label="External profiles">
          <a href="https://www.linkedin.com/in/aleksandra-stanczak2/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.researchgate.net/profile/Aleksandra-Stanczak-4?ev=hdr_xprf" target="_blank" rel="noreferrer">ResearchGate</a>
        </div>
      </div>
    </footer>
  );
}
