import { type FormEvent, useState } from "react";

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) return;

    setStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/astanczak65@gmail.com", {
        body: new FormData(event.currentTarget),
        headers: {
          Accept: "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Newsletter signup failed");
      }

      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
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
          <input type="hidden" name="_subject" value="New PolkaLady newsletter subscription" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
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
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending" : "Subscribe"}
            </button>
          </div>
          <p>
            {status === "sent" && "Thank you. Please check your inbox if confirmation is required."}
            {status === "error" && "Something went wrong. Please try again in a moment."}
            {(status === "idle" || status === "sending") && "Occasional notes on digital geography, AI, and visual research."}
          </p>
        </form>

        <div className="footer-links" aria-label="External profiles">
          <a href="https://www.linkedin.com/in/aleksandra-stanczak2/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.researchgate.net/profile/Aleksandra-Stanczak-4?ev=hdr_xprf" target="_blank" rel="noreferrer">ResearchGate</a>
        </div>
      </div>
    </footer>
  );
}
