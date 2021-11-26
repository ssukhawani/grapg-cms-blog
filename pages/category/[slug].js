import React, { useState } from "react";
import { useRouter } from "next/router";

import { getCategories } from "../../services";
import { PostCard, Categories, Loader } from "../../components";

import { request } from "graphql-request";
import useSWR from "swr";

const fetcher = (endpoint, query, variables) =>
  request(endpoint, query, variables);
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const CategoryPost = ({ posts }) => {
  const router = useRouter();
  const {slug} = router.query
  const [skip, setSkip] = useState(0);
  if (router.isFallback) {
    return <Loader />;
  }

  const { data, error } = useSWR(
    [
      graphqlAPI,
      `query GetCategoryPost($slug: String!,$skip: Int) {
        postsConnection(first: 6,skip: $skip, orderBy: createdAt_DESC,where: { categories_some: { slug: $slug } }) {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
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
    slug,
    skip,
  ],
    (endpoint, query) => fetcher(endpoint, query, {slug, skip }),
    { initialData: posts, revalidateOnFocus: true },
  );

  return (
    <div className="container mx-auto px-4 sm:px-10 mb-8 relative ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1 grid grid-cols-1 lg:grid-cols-2 sm:gap-5 grid-flow-row auto-rows-max relative pb-12">
          {data?.postsConnection?.edges?.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
          {posts.length > 5 && <div className="flex justify-content absolute bottom-0 left-1/2  transform -translate-x-1/2 ">
            <button
              areal-label="Previous"
              disabled={!data?.postsConnection?.pageInfo?.hasPreviousPage}
              onClick={() => {
                setSkip(skip - 6);
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
              }}
              className="hover:ring-2 hover:ring-offset-1 font-semibold hover:ring-white focus:ring-white focus:ring-2 focus:ring-offset-1 focus:bg-black focus:outline-none hover:scale-95  w-full sm:w-auto bg-black transition duration-150 ease-in-out rounded text-white px-8 py-3 text-sm mt-6 m-1 disabled:bg-gray-400 disabled:text-black"
            >
              Next
            </button>
          </div>}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mb-8 pb-12 text-sm sm:text-base">
              <h3 className="text-center text-sm sm:text-xl mb-4 sm:mb-8 font-semibold border-b border-blue-300 pb-4">
                How to Download?
              </h3>
              <iframe
                src="https://www.youtube.com/embed/c2mva3X-Iqk?modestbranding=1&showinfo=1&rel=0"
                title="How to Properly open or download files from Linkvertise"
                frameborder="0"
                allowfullscreen="allowfullscreen"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await fetcher(
    graphqlAPI,
    `query GetCategoryPost($slug: String!) {
      postsConnection(first: 6,skip:0, orderBy: createdAt_DESC,where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
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
{slug:params.slug}
);

  return {
    props: {
      posts: posts.postsConnection.edges,
      pageInfo: posts.postsConnection.pageInfo,
    },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
