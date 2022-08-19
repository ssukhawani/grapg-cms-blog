import React, { useEffect, useState } from "react";
import { getPages, getPageDetails } from "../services";
import { useRouter } from "next/router";
import NotFound from "./404";
import { PageDetail, Categories, PostWidgets, Loader } from "../components";
import { AdsContainer } from "../components/AdsContainer";
import { DOWNLOAD_LIST_EXT } from "../constants/downloadList";
import Script from "next/script";
import { BLACK_LIST_DMCA } from "../constants/dmca-list";
const pagePaths = [
  "/about",
  "/terms-and-conditions",
  "/privacy-policy",
  "/disclaimer",
  "/sitemap.xml",
];

const PageDetails = ({ page }) => {
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState("");

  const {
    query: { name, slug },
  } = router;

  if (BLACK_LIST_DMCA.includes(`/post/${name}`)) {
    router.push({
      pathname: "/",
      state: {
        lookingFor: name,
      },
    });
  }

  const getMeDownloadLink = ({ link, title }) => title === name;

  useEffect(() => {
    const urlObj = DOWNLOAD_LIST_EXT.find(getMeDownloadLink);
    if (urlObj) {
      setRedirectUrl(urlObj.link);
    }
  }, [router.query.name]);

  if (router.isFallback) {
    return <Loader />;
  }

  if (!pagePaths.includes(router.asPath)) {
    if (slug !== "about") {
      return <NotFound />;
    }
  }

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
      <div className="container mx-auto px-4 sm:px-10 mb-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PageDetail page={page} url={redirectUrl} slug={slug}/>
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidgets />
              <Categories />
            </div>
          </div>
        </div>
        <AdsContainer
          client={"ca-pub-2093009960356176"}
          slot={"6341267557"}
          adFormat={"autorelaxed"}
        />
      </div>
    </>
  );
};

export default PageDetails;

export async function getStaticProps({ params }) {
  const data = await getPageDetails(params.slug);

  return {
    props: {
      page: data,
    },
  };
}

export async function getStaticPaths() {
  const pages = await getPages();

  return {
    paths: pages.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
