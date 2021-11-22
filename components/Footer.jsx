import React from "react";
import Link from "next/link";


const Footer = ({pages}) => {

  return (
    <div className="pt-16">
      <div className="w-full bg-black bg-opacity-60 py-12">
        <div className="container mx-auto xl:flex text-center xl:text-left lg:text-left">
          <div className="xl:w-3/6 sm:w-full lg:w-full text-center xl:text-left mb-6 xl:mb-0 text-sm md:text-base">
            <p className="text-white sm:text-center lg:text-center xl:text-left">
                &copy; 2021 FrontendFreck. All Rights Reserved
            </p>
          </div>
          <div className="xl:w-3/6 sm:w-full">
            <ul className="xl:flex lg:flex md:flex sm:flex justify-around">
            {pages.map((page) => (
              <li className="text-white mb-3 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0" key={page.title}>
                <Link  href={`/${page.slug}`} area-label={page.title}>
                  <span className="cursor-pointer text-sm md:text-base text-white md:float-right mt-2 ml-4 font-semibold hover:text-pink-500">
                    {page.title}
                  </span>
                </Link>
              </li>
            ))}
              
              <li className="text-white mb-3 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0">
                <Link href={"/sitemap.xml"}>
                  <span className="cursor-pointer text-sm md:text-base text-white md:float-right mt-2 ml-4 font-semibold hover:text-pink-500">
                    Sitemap
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

