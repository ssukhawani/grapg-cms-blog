import React,{useState,useEffect} from "react";
import Head from "next/head";
import { Categories, PostCard, PostWidgets } from "../components";
import { getPosts,getSearchPosts } from "../services";
import { FeaturedPosts } from "../sections";
import postStyles from "../components/post-styles.module.css";

export default function Home({ posts }) {
  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handelChange=(e)=>{
    if(!Boolean(searchValue)){
      setSearchResults([])
    }
    setSearchValue(e.target.value)
  }

  const handelSubmit=()=>{
    if(Boolean(searchValue)){
      getSearchPosts(searchValue)
      .then((newPosts) => setSearchResults(newPosts))
    }
  }

  const handleSubmitOnEnter = (event) => {
    if (event.key === "Enter") {
      handelSubmit();
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-10 mb-8 relative">
      <Head>
        <title>FrontendFreck</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="FrontendFreck helps you to make your dev journey more exciting with cool resources"
        />
        <meta property="og:url" content={process.env.SITE_URL} key="ogurl" />
        <meta
          property="og:site_name"
          content="FrontendFreck.codes"
          key="ogsitename"
        />
        <meta property="og:title" content="FrontendFreck" key="ogtitle" />
        <meta
          property="og:description"
          content="FrontendFreck helps you to make your dev journey more exciting with cool resources"
          key="ogdesc"
        />
      </Head>
      <div className={`searchBox ${postStyles.searchBox}`}>
        <input
          className={`searchInput ${postStyles.searchInput}`}
          type="text"
          value={searchValue}
          placeholder="Search"
          onChange={handelChange}
          onKeyPress={handleSubmitOnEnter}
        />
        <button className={`searchButton ${postStyles.searchButton}`} onClick={handelSubmit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1 grid grid-cols-1 lg:grid-cols-2 sm:gap-5 grid-flow-row auto-rows-max">
          {Boolean(searchValue) && searchResults.length > 0 ? 
              searchResults.map((post) => (
                <PostCard post={post.node} key={post.node.title} />
              )):
              posts.map((post) => (
                <PostCard post={post.node} key={post.node.title} />
              ))
          }
        </div>

        <div className="lg:col-span-4 col-span-1 ">
          <div className="lg:sticky relative top-8">
            <PostWidgets />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: {
      posts,
    },
  };
}
