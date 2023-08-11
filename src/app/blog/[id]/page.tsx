import React from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import { notFound } from "next/navigation";
import Comments from "../../../components/CommentsSection/Comments/Comments";

interface Params {
  id: string;
  title: string;
  description: string;
  stars: {
    value: number;
  };
}

interface BlogPostProps {
  params: Params;
}

async function getData(id: string) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

export async function generateMetadata({ params }: { params: Params }) {
  const post = await getData(params.id);
  return {
    title: post.title,
    description: post.desc,
  };
}

const BlogPost: React.FC<BlogPostProps> = async ({ params }) => {
  const data = await getData(params.id);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>{data.desc}</p>
          <div className={styles.author}>
            <Image
              src={data.img}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src={data.img} alt="" fill={true} className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{data.content}</p>
      </div>
      <div>
        <Comments commentsData={data.comments} blogId={data._id} />
      </div>
    </div>
  );
};

export default BlogPost;
