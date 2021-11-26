import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// used in the index.js with useSWR hook for pagination and search
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection(first: 9, orderBy: createdAt_DESC) {
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
          pageSize
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

//used in the index.js with useSWR hook for pagination and search
// export const getSearchPosts = async (searchValue) => {
//   const query = gql`
//     query MyQuery($searchValue: String!) {
//       postsConnection(
//         first: 9
//         orderBy: createdAt_DESC
//         where: {
//           OR: [
//             { title_contains: $searchValue }
//             { slug_contains: $searchValue }
//           ]
//         }
//       ) {
//         edges {
//           node {
//             author {
//               bio
//               id
//               name
//               photo {
//                 url
//               }
//             }
//             createdAt
//             slug
//             title
//             excerpt
//             featuredImage {
//               url
//             }
//             categories {
//               name
//               slug
//             }
//             isWorking {
//               now
//             }
//           }
//         }
//         pageInfo {
//           hasNextPage
//           pageSize
//         }
//       }
//     }
//   `;

//   const result = await request(graphqlAPI, query, { searchValue });

//   return result.postsConnection.edges;
// };

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
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
        content {
          html
          text
        }
        downloads {
          url
          title
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails(){
      posts(
        orderBy:createdAt_ASC
        last:3
      ){
        title
        featuredImage{
          url
        }
        createdAt
        slug
      } 
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { categories, slug });

  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories(orderBy: name_ASC) {
        name
        slug
        post {
          id
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.categories;
};


export const submitComment = async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true},orderBy:createdAt_ASC,last:8) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

// export const getCategoryPost = async (slug) => {
//   const query = gql`
//     query GetCategoryPost($slug: String!) {
//       postsConnection(where: { categories_some: { slug: $slug } }) {
//         edges {
//           cursor
//           node {
//             author {
//               bio
//               name
//               id
//               photo {
//                 url
//               }
//             }
//             createdAt
//             slug
//             title
//             excerpt
//             featuredImage {
//               url
//             }
//             categories {
//               name
//               slug
//             }
//             isWorking {
//               now
//             }
//           }
//         }
//         pageInfo {
//           hasNextPage
//           hasPreviousPage
//           pageSize
//         }
//       }
//     }
//   `;

//   const result = await request(graphqlAPI, query, { slug });

//   return result.postsConnection.edges;
// };

export const getPages = async () => {
  const query = gql`
    query GetPages {
      pages(orderBy: createdAt_DESC) {
        slug
        title
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.pages;
};

export const getPageDetails = async (slug) => {
  const query = gql`
    query GetPageDetails($slug: String!) {
      page(where: { slug: $slug }) {
        slug
        title
        content {
          html
          text
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.page;
};
