export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-copy">
          <p className="section-label">PolkaLady</p>
          <p>All copyrights reserved.</p>
        </div>

        <form action="https://formsubmit.co/astanczak65@gmail.com" className="newsletter-signup" method="POST">
          <label htmlFor="newsletter-email">Newsletter</label>
          <input type="hidden" name="_subject" value="New PolkaLady newsletter subscription" />
          <input type="hidden" name="_template" value="table" />
          <input
            type="hidden"
            name="_autoresponse"
            value={"You have subscribed to PolkaLady newsletter.\n\nYou will be informed if new blog articles or works will be published. Stay tuned."}
          />
          <input type="hidden" name="_next" value="https://www.polkalady.com/" />
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div>
            <input
              id="newsletter-email"
              name="email"
              placeholder="Email address"
              type="email"
              required
            />
            <button type="submit">Subscribe</button>
          </div>
          <p>Occasional notes on digital geography, AI, and visual research.</p>
        </form>

        <div className="footer-links" aria-label="External profiles">
          <a href="https://www.linkedin.com/in/aleksandra-stanczak2/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.researchgate.net/profile/Aleksandra-Stanczak-4?ev=hdr_xprf" target="_blank" rel="noreferrer">ResearchGate</a>
        </div>
      </div>
    </footer>
  );
}
