import React from "react";
import postStyles from "./post-styles.module.css";
import Head from "next/head";

const PageDetail = ({ page }) => {
  return (
    <>
    <Head>
      <title>{page.title}</title>
      <meta name="description" content={page.title}/>
    </Head>
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="px-4 py-4 sm:py-2 lg:px-0">
        <div
          className={`max-w-2xl mx-auto post ${postStyles.post}`}
          dangerouslySetInnerHTML={{ __html: page.content.html }}
        />
      </div>
    </div>
    </>
  );
};

export default PageDetail;
