import "tailwindcss/tailwind.css";
import { Layout } from "../components";
import Script from "next/script";

import "../styles/globals.scss";
import "react-responsive-modal/styles.css";
import OneSignal from "react-onesignal";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    OneSignal.init({ appId: "0cf37607-f7c7-459c-8258-6cd271c6a25b" });
  });

  return (
    <>
      <Script
        id="adsenseId"
        async={true}
        strategy="beforeInteractive"
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2093009960356176"
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
