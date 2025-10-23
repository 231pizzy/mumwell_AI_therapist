"use client";

import Hero from "@/components/aboutPageComponents/Hero";
import PostpartumArticle from "@/components/ppArticle/PostpartumArticle";
// import { blogData } from "@/components/data";
import Image from "next/image";
import { JSX } from "react";

// ----- Types -----


interface ContentItem {
  type: string;
  text?: string;
  title?: string;
  level?: number;
  imageKey?: string;
  alt?: string;
  items?: { label?: string; text: string }[];
  ordered?: boolean;
}

interface Blog {
  id: string | number;
  title: string;
  categories: string[];
  content: ContentItem[];
}

interface ContentRendererProps {
  content: ContentItem;
}

interface ContentItem {
  type:
  | "paragraph"
  | "heading"
  | "image"
  | "section"
  | "callout"
  | "list"
  | "quote"
  | string;
  text?: string;
  title?: string;
  level?: number;
  imageKey?: string;
  alt?: string;
  placeholder?: string;
  items?: { label?: string; text: string }[];
  ordered?: boolean;
}

interface Blog {
  id: string | number;
  title: string;
  categories: string[];
  excerpt?: string;
  content: ContentItem[];
}




const imageMap: Record<string, string> = {
  img1: "/love.webp",
  img2: "/ppd.jpg",
  img3: "/ppd.jpg",
};

// ----- Content Renderer -----
const ContentRenderer: React.FC<ContentRendererProps> = ({ content }) => {
  const renderText = (text: string) =>
    text
      .split("**")
      .map((part, index) =>
        index % 2 === 1 ? <strong key={index}>{part}</strong> : part
      );

  switch (content.type) {
    case "paragraph":
      return <p className="text-foreground mb-4">{renderText(content.text || "")}</p>;

    case "heading": {
      const HeadingTag = `h${content.level}` as keyof JSX.IntrinsicElements;
      const headingClasses: Record<number, string> = {
        3: "text-xl md:text-2xl font-bold text-foreground mb-4",
        4: "font-bold text-foreground mb-3",
      };
      return (
        <HeadingTag className={headingClasses[content.level || 3]}>
          {content.text}
        </HeadingTag>
      );
    }

    case "image": {
      const imageSource = content.imageKey ? imageMap[content.imageKey] : imageMap["img1"];
      return (
        <Image
          src={imageSource}
          alt={content.alt || "Blog Image"}
          height={300}
          width={300}
          className="w-full h-72 object-cover rounded mb-8"
        />
      );
    }

    case "section":
      return (
        <div className="mb-6">
          <h4 className="font-bold text-foreground mb-3">{content.title}</h4>
          <div className="space-y-2 text-foreground">
            {content.items?.map((item, index) => (
              <p key={index}>
                {item.label && <span className="font-semibold">{item.label}:</span>}{" "}
                {renderText(item.text)}
              </p>
            ))}
          </div>
        </div>
      );

    case "callout":
      return (
        <div className="bg-card p-4 border-l-4 border-gray-300 mb-6">
          <p className="text-foreground">{renderText(content.text || "")}</p>
        </div>
      );

    case "list": {
      const ListTag = content.ordered ? "ol" : "ul";
      const listClass = content.ordered
        ? "list-decimal list-inside space-y-1 ml-4"
        : "space-y-1 text-foreground";

      return (
        <ListTag className={listClass}>
          {content.items?.map((item, index) => (
            <li key={index}>{item.text}</li>
          ))}
        </ListTag>
      );
    }

    case "quote":
      return (
        <div className="bg-red-600 p-4 rounded mb-6">
          <p className="text-foreground italic mb-2">
            <strong>{content.title}</strong>
          </p>
          <p className="text-foreground italic text-sm">{content.text}</p>
        </div>
      );

    default:
      return null;
  }
};

// ----- Blog Article -----
// interface BlogArticleProps {
//   blog: Blog;
//   isFirst?: boolean;
// }

// const BlogArticle: React.FC<BlogArticleProps> = ({ blog, isFirst = false }) => (
//   <article className={isFirst ? "mb-12" : "border-t pt-8"}>
//     <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{blog.title}</h2>
//     <div className="text-sm text-foreground mb-6">
//       {blog.categories.map((category, index) => (
//         <span key={category}>
//           <span className="uppercase">{category}</span>
//           {index < blog.categories.length - 1 && <> , </>}
//         </span>
//       ))}
//     </div>
//     <div className="space-y-4">
//       {blog.content.map((content, index) => (
//         <ContentRenderer key={index} content={content} />
//       ))}
//     </div>
//   </article>
// );

// ----- Sidebar -----


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
