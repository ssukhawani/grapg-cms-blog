import React from "react";
import { getPosts, getPostDetails } from "../../services";
import { useRouter } from "next/router";
import {
  PostDetail,
  Categories,
  PostWidgets,
  Author,
  Comments,
  CommentForm,
  Loader,
} from "../../components";
import { AdsContainer } from "../../components/AdsContainer";
import { BLACK_LIST_DMCA } from "../../constants/dmca-list";
import Script from "next/script";
const PostDetails = ({ post }) => {
  const router = useRouter();

  if (BLACK_LIST_DMCA.includes(router.asPath)) {
    router.push({
      pathname: "/",
      state: {
        lookingFor: router.asPath,
      },
    });
  }

  if (router.isFallback) {
    return <Loader />;
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
      <div className="container mx-auto px-4 sm:px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            <CommentForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidgets
                slug={post.slug}
                categories={post.categories.map((category) => category.slug)}
              />
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

export default PostDetails;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);

  return {
    props: {
      post: data,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
