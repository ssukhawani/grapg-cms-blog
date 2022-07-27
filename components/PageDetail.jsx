import React from "react";
import postStyles from "./post-styles.module.css";
import Head from "next/head";
import { AdsContainer } from "./AdsContainer";

const PageDetail = ({ page }) => {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.title} />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2093009960356176"
          crossorigin="anonymous"
        ></script>
      </Head>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <AdsContainer client={"ca-pub-2093009960356176"} slot={"6096288180"} />
        <div className="px-4 py-4 sm:py-2 lg:px-0">
          <div
            className={`max-w-2xl mx-auto post ${postStyles.post}`}
            dangerouslySetInnerHTML={{ __html: page.content.html }}
          />
        </div>
        <AdsContainer client={"ca-pub-2093009960356176"} slot={"6096288180"} />
      </div>
    </>
  );
};

export default PageDetail;
