"use client";

import Hero from "@/components/aboutPageComponents/Hero";
import PostpartumArticle from "@/components/ppArticle/PostpartumArticle";
// import { blogData } from "@/components/data";

import { JSX } from "react";

// ----- Types -----

// ----- Main Component -----
export default function PostpartumDepression(): JSX.Element {
  return (
    <>
      <Hero title="Postpartum Depression" />
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="lg:col-span-2">
          <div className="mb-12 text-foreground">
            <p className="mb-4">
              Postpartum depression affects many new mothers. Early awareness, support, and professional care can make all the difference.
            </p>
            <p>
              Explore our comprehensive guides, educational resources, and AI-powered screening tools designed to help mothers, families, and healthcare providers navigate postpartum mental health challenges.
            </p>
          </div>

          <PostpartumArticle />
          {/* {blogData.map((blog, index) => (
            <BlogArticle key={blog.id} blog={blog} isFirst={index === 0} />
          ))} */}
        </div>

        {/* <Sidebar /> */}
      </div>
    </>
  );
}
