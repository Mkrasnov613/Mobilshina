export const GA_ADS_ID = "AW-18400921245";

/** Google Ads "Контакт" conversion label (phone-call clicks + form submit). */
const CONVERSION_SEND_TO = `${GA_ADS_ID}/dRXHCJH71OkcEJ2Nn8ZE`;

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

/**
 * Fires the Google Ads conversion event. Ported from the old
 * `gtag_report_conversion_call` helper. If `url` is provided the browser
 * navigates there once the event has been sent (or after a short fallback),
 * matching the previous `tel:` link behaviour.
 */
export function reportConversion(url?: string): boolean {
  const navigate = () => {
    if (url) window.location.href = url;
  };

  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    navigate();
    return false;
  }

  let navigated = false;
  const go = () => {
    if (navigated) return;
    navigated = true;
    navigate();
  };

  window.gtag("event", "conversion", {
    send_to: CONVERSION_SEND_TO,
    value: 1.0,
    currency: "UAH",
    event_callback: go,
  });

  // Fallback in case the callback never fires.
  if (url) window.setTimeout(go, 1000);
  return false;
}
