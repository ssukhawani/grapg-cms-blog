import "tailwindcss/tailwind.css";
import { Layout } from "../components";
import Script from "next/script";

import "../styles/globals.scss";
import "react-responsive-modal/styles.css";

function MyApp({ Component, pageProps }) {
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
