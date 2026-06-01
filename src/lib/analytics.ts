const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
const consentKey = "polkalady-analytics-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initializeAnalytics() {
  if (!measurementId || window.gtag || getAnalyticsConsent() !== "granted") return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });
}

export function analyticsConfigured() {
  return Boolean(measurementId);
}

export function getAnalyticsConsent() {
  return window.localStorage.getItem(consentKey);
}

export function setAnalyticsConsent(granted: boolean) {
  window.localStorage.setItem(consentKey, granted ? "granted" : "denied");
  if (granted) initializeAnalytics();
}

export function trackEvent(name: string, parameters: Record<string, string> = {}) {
  window.gtag?.("event", name, parameters);
}

export function trackPageView(path: string, title: string) {
  window.gtag?.("event", "page_view", {
    page_location: `${window.location.origin}${path}`,
    page_path: path,
    page_title: title,
  });
}
