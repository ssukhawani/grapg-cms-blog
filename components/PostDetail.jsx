import React from "react";
import moment from "moment";
import postStyles from "./post-styles.module.css";
import Head from "next/head";
import Link from "next/link";
import { AdsContainer } from "./AdsContainer";

const PostDetail = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.title} />
        <meta
          property="og:url"
          content={process.env.SITE_URL + post.slug}
          key="ogurl"
        />
        <meta
          property="og:image"
          content={post.featuredImage.url}
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content="FrontendFreck"
          key="ogsitename"
        />
        <meta property="og:title" content={post.title} key="ogtitle" />
        <meta
          property="og:description"
          content={post.content.text.slice(0, 250)}
          key="ogdesc"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2093009960356176"
          crossorigin="anonymous"
        ></script>
      </Head>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <AdsContainer client={"ca-pub-2093009960356176"} slot={"6096288180"} />
        <div className="relative overflow-hidden shadow-md mb-2 md:mb-6">
          <img
            src={post.featuredImage.url}
            alt={post.title}
            className="object-top h-full w-full rounded-t-lg lg:rounded-lg"
          />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center w-full mb-4 md:mb-8 justify-center">
            <div className="flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
              <img
                src={post.author.photo.url}
                alt={post.author.name}
                className="align-middle rounded-full"
                height="30px"
                width="30px"
              />
              <p className="inline align-middle text-gray-700 ml-2 text-xs md:text-sm">
                {post.author.name}
              </p>
            </div>
            <div className="font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="align-middle text-xs md:text-sm justify-center">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
          <h1 className="mb-8 text-xl md:text-3xl font-semibold text-center">
            {post.title}
          </h1>
          <AdsContainer
            client={"ca-pub-2093009960356176"}
            slot={"6096288180"}
          />
          <div
            className={`max-w-2xl mx-auto post ${postStyles.post}`}
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          />
          <AdsContainer
            client={"ca-pub-2093009960356176"}
            slot={"6096288180"}
          />
          <div className="mt-8 text-center">
            {post.downloads.length > 0 &&
              post.downloads.map((download) => (
                <div className="inline-block sm:m-2" key={download.url}>
                  <span className="hover:shadow-xl hover:scale-95 hover:bg-indigo-700 m-1 sm:my-2 transition duration-150 text-xs sm:text-base font-bold inline-block bg-pink-600 rounded-full text-white px-4 py-2 sm:px-8 sm:py-3 cursor-pointer">
                    <a target="_blank" href={download.url}>
                      {download.title}
                    </a>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
