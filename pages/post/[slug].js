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
const PostDetails = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
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
