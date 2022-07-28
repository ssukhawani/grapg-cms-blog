import React from "react";
import { getPages, getPageDetails } from "../services";
import { useRouter } from "next/router";
import NotFound from "./404";
import { PageDetail, Categories, PostWidgets, Loader } from "../components";
import { AdsContainer } from "../components/AdsContainer";
const pagePaths = [
  "/about",
  "/terms-and-conditions",
  "/privacy-policy",
  "/disclaimer",
  "/sitemap.xml",
];

const PageDetails = ({ page }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  if (!pagePaths.includes(router.asPath)) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PageDetail page={page} />
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
