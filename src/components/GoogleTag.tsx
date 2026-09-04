import Script from "next/script";
import { GA_ADS_ID } from "@/utils/gtag";

/** Google Ads global site tag (gtag.js). Ported from the old inline <head> snippet. */
export default function GoogleTag() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ADS_ID}');`}
      </Script>
    </>
  );
}
