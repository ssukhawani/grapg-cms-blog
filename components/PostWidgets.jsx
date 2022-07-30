import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";

import { getRecentPosts, getSimilarPosts } from "../services";
import { AdsContainer } from "./AdsContainer";

const PostWidgets = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mb-8">
      <h2 className="text-center text-sm sm:text-xl mb-4 sm:mb-8 font-semibold border-b border-blue-300 pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h2>
      {relatedPosts.map((post,ind) => (
        <div key={ind+post.slug}>
          <AdsContainer
            client={"ca-pub-2093009960356176"}
            slot={"4225421868"}
            adFormat={"fluid"}
            data-ad-layout-key="-gw-3+1f-3d+2z"
          />
          <div key={post.title} className="flex items-center w-full mb-4">
            <div className="w-16 flex-none">
              <Image
                unoptimized
                alt={post.title}
                height="60px"
                width="60px"
                className="align-middle rounded-lg"
                src={post.featuredImage.url}
              />
            </div>
            <div className="flex-grow ml-4 text-sm sm:text-base">
              <p className="text-gray-500 text-xs sm:text-base">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </p>
              <Link href={`/post/${post.slug}`}>
                <a className="hover:text-pink-500">{post.title}</a>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidgets;
