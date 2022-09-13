import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { Categories, PostCard, PostWidgets } from "../components";
// import { getPosts, getSearchPosts } from "../services";
import { FeaturedPosts } from "../sections";
import postStyles from "../components/post-styles.module.css";
import { request } from "graphql-request";
import useSWR from "swr";
import { AdsContainer } from "../components/AdsContainer";
import { useRouter } from "next/router";
import { DOWNLOAD_LIST_EXT } from "../constants/downloadList";
import { getMeRandomNum } from "../components/PostDetail";
import SupportSuccess from "../components/SupportSuccess";
import Timer from "../components/Timer";
import Modal from "react-responsive-modal";

const fetcher = (endpoint, query, variables) =>
  request(endpoint, query, variables);
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default function Home({ posts, pageInfo }) {
  const bottomRef = useRef(null);
  const initialRenderRef = useRef(true);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [skip, setSkip] = useState(0);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [showDownload, setShowDownload] = useState(false);
  const [initialTimerFlag, setInitialTimerFlag] = useState(false);
  const [flag, setFlag] = useState(false);
  const [decisionNo, setDecisionNo] = useState("");
  const [finalRedirectUrl, setFinalRedirectUrl] = useState("");

  useEffect(() => {
    if (initialRenderRef.current) {
      setInitialTimerFlag(true);
    }
    initialRenderRef.current = false;
  }, []);

  const onFinishTimer = (when) => {
    if (when === "initial") {
      setDecisionNo(`${getMeRandomNum()}`);
      setShowDownload(true);
    } else {
      if (!!redirectUrl) {
        window.open(finalRedirectUrl);
        setFlag(false);
      }
    }
  };

  const checkForLinkValidation = (finalRedirectUrl) => {
    let link = prompt(
      `Hit On any Ad, Copy redirected Url & put it here To Support this Forum: `
    );
    if (
      link &&
      link.length > 100 &&
      link.includes("https", 0) &&
      link.includes("gclid=")
    ) {
      setFinalRedirectUrl(finalRedirectUrl);
      setFlag(true);
      setShowDownload(false);
      setInitialTimerFlag(false);
    } else {
      alert("Try Again! here only valid urls are allowed");
    }
  };

  const {
    query: { name, slug, from },
  } = router;

  const getMeDownloadLink = ({ link, title }) => title === name;

  useEffect(() => {
    if (!!name && !!from) {
      const urlObj = DOWNLOAD_LIST_EXT.find(getMeDownloadLink);
      if (urlObj) {
        setRedirectUrl(urlObj.link);
      }
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 4000);
    }
  }, [name]);

  const { data, error } = useSWR(
    [
      graphqlAPI,
      `query MyQuery($searchValue:String!,$skip: Int) {
        postsConnection(first: 6, skip: $skip, orderBy: createdAt_DESC,where:{OR:[{title_contains:$searchValue},{slug_contains:$searchValue}]}) {
          edges {
            node {
              author {
                bio
                id
                name
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
              isWorking {
                now
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            pageSize
          }
        }
      }
      
  `,
      searchValue,
      skip,
    ],
    (endpoint, query) => fetcher(endpoint, query, { searchValue, skip }),
    { initialData: posts, revalidateOnFocus: true }
  );

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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2093009960356176"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className={`searchBox ${postStyles.searchBox}`}>
        <input
          className={`searchInput ${postStyles.searchInput}`}
          type="text"
          value={searchValue}
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className={`searchButton ${postStyles.searchButton}`}>
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
      {!searchValue && <FeaturedPosts fromHome />}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ">
        <div className="lg:col-span-8 col-span-1 grid grid-cols-1 lg:grid-cols-2 sm:gap-5 grid-flow-row auto-rows-max relative pb-12">
          {data?.postsConnection?.edges?.map((post, ind) => {
            // if (ind % 3 === 0) {
            return (
              <div key={post.node.title + ind}>
                <PostCard post={post.node} key={post.node.title} />
                <div>
                  <AdsContainer
                    client={"ca-pub-2093009960356176"}
                    slot={"6096288180"}
                    adFormat={"auto"}
                  />
                  <AdsContainer
                    client={"ca-pub-2093009960356176"}
                    slot={"6096288180"}
                    adFormat={"auto"}
                  />
                </div>
              </div>
            );
            // }
            // return <PostCard post={post.node} key={post.node.title} />;
          })}

          <AdsContainer
            client={"ca-pub-2093009960356176"}
            slot={"6096288180"}
            adFormat={"auto"}
          />
          <AdsContainer
            client={"ca-pub-2093009960356176"}
            slot={"6096288180"}
            adFormat={"auto"}
          />

          <div className="my-2 flex justify-content absolute bottom-0 left-1/2  transform -translate-x-1/2 ">
            <button
              areal-label="Previous"
              disabled={!data?.postsConnection?.pageInfo?.hasPreviousPage}
              onClick={() => {
                setSkip(skip - 6);
                window.scrollTo(0, 150);
              }}
              className="hover:ring-2 hover:ring-offset-1 font-semibold focus:ring-white focus:ring-2 focus:ring-offset-1 hover:ring-white focus:bg-black focus:outline-none hover:scale-95  w-full sm:w-auto bg-black transition duration-150 ease-in-out  rounded text-white px-8 py-3 text-sm mt-6 m-1 disabled:bg-gray-400 disabled:text-black"
            >
              Previous
            </button>
            <button
              areal-label="Next"
              disabled={!data?.postsConnection?.pageInfo?.hasNextPage}
              onClick={() => {
                setSkip(skip + 6);
                window.scrollTo(0, 150);
              }}
              className="hover:ring-2 hover:ring-offset-1 font-semibold hover:ring-white focus:ring-white focus:ring-2 focus:ring-offset-1 focus:bg-black focus:outline-none hover:scale-95  w-full sm:w-auto bg-black transition duration-150 ease-in-out rounded text-white px-8 py-3 text-sm mt-6 m-1 disabled:bg-gray-400 disabled:text-black"
            >
              Next
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 col-span-1 ">
          <div className="lg:sticky relative top-8">
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
      {!!name && !!from && (
        <div
          className="h-32 w-full rounded-lg opacity-50"
          ref={bottomRef}
        >
          {!!redirectUrl && (
            <div className="py-4 text-center">
              {showDownload ? (
                <>
                  {['1','2'].includes(decisionNo) ? (
                    <span
                      onClick={() => checkForLinkValidation(redirectUrl)}
                      className="hover:shadow-xl hover:scale-95 hover:bg-indigo-700 m-1 sm:my-2 transition duration-150 text-xs sm:text-base font-bold inline-block bg-pink-600 rounded-full text-white px-4 py-2 sm:px-8 sm:py-3 cursor-pointer"
                    >
                      Download..
                    </span>
                  ) : (
                    <>
                      <span
                        onClick={() => window.open(redirectUrl)}
                        className="hover:shadow-xl hover:scale-95 hover:bg-indigo-700 m-1 sm:my-2 transition duration-150 text-xs sm:text-base font-bold inline-block bg-pink-600 rounded-full text-white px-4 py-2 sm:px-8 sm:py-3 cursor-pointer"
                      >
                        Download..
                      </span>
                    </>
                  )}
                </>
              ) : (
                <>
                  {initialTimerFlag && (
                    <p className="text-md text-black dark:text-gray-400 font-normal text-center">
                      Your download link is getting generated <br /> in{" "}
                      <Timer
                        seconds={25}
                        onFinish={() => onFinishTimer("initial")}
                      />{" "}
                      seconds
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
      {flag && (
        <Modal
          classNames={{
            overlayAnimationIn: "customEnterOverlayAnimation",
            overlayAnimationOut: "customLeaveOverlayAnimation",
            modalAnimationIn: "customEnterModalAnimation",
            modalAnimationOut: "customLeaveModalAnimation",
          }}
          animationDuration={500}
          open={flag}
          onClose={() => setFlag(false)}
          showCloseIcon={false}
          styles={{
            modal: {
              background: "#FFFF00",
              borderRadius: "20px",
            },
          }}
        >
          <SupportSuccess
            setFlag={setFlag}
            onFinish={() => onFinishTimer("final")}
          />
        </Modal>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const posts = await fetcher(
    graphqlAPI,
    `
    query MyQuery {
      postsConnection(first: 6,skip:0, orderBy: createdAt_DESC) {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
            isWorking {
              now
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          pageSize
        }
      }
    }
    
`
  );

  return {
    props: {
      posts: posts.postsConnection.edges,
      pageInfo: posts.postsConnection.pageInfo,
    },
  };
}
