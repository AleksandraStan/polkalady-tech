import { useState } from "react";
import {
  analyticsConfigured,
  getAnalyticsConsent,
  setAnalyticsConsent,
  trackPageView,
} from "../lib/analytics";

export default function AnalyticsConsent() {
  const [visible, setVisible] = useState(
    () => analyticsConfigured() && getAnalyticsConsent() === null,
  );

  if (!visible) return null;

  const saveConsent = (granted: boolean) => {
    setAnalyticsConsent(granted);
    if (granted) trackPageView(window.location.pathname, document.title);
    setVisible(false);
  };

  return (
    <aside className="analytics-consent" aria-label="Analytics preferences">
      <p>
        This site uses optional analytics to understand which stories and
        experiences visitors find useful.
      </p>
      <div>
        <button onClick={() => saveConsent(true)} type="button">Allow analytics</button>
        <button onClick={() => saveConsent(false)} type="button">No thanks</button>
      </div>
    </aside>
  );
}
