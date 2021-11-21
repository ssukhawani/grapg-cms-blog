import Head from "next/head";
import { Categories, PostCard, PostWidgets } from "../components";
import { getPosts } from '../services'
import { FeaturedPosts } from '../sections';


export default function Home({posts}) {
  return (
    <div className="container mx-auto px-4 sm:px-10 mb-8">
      <Head>
        <title>FrontendFreck</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" rel="stylesheet"></link>
      <meta name="description" content="FrontendFreck helps you to make your dev journey more exciting with cool resources"/>
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