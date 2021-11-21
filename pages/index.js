import Head from "next/head";
import { Categories, PostCard, PostWidgets } from "../components";
import { getPosts } from '../services'
import { FeaturedPosts } from '../sections';


export default function Home({posts}) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>FrontendFreck</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1 grid grid-cols-1 lg:grid-cols-2 sm:gap-5">
          {posts.map((post) => (
            <PostCard post={post.node} key={post.node.title}/> 
          ))}
        </div>

        <div className="lg:col-span-4 col-span-1 ">
          <div className="lg:sticky relative top-8">
            <PostWidgets/>
            <Categories/>
          </div>
        </div>
      </div>
    </div>
  );
}


export async function getStaticProps(){
  const posts = (await getPosts()) || [];

  return{
    props: {
      posts
    }
  }
}