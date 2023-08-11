import React from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface IBlog {
  userId: number;
  id: number;
  title: string;
  body: string;
  _id: string | number | any;
  img: string;
  desc: string;
  stars: {
    value: number;
  };
}

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return notFound();
    }

    return res.json();
  } catch (error) {
    return notFound();
  }
}

const Blog = async () => {
  const data = await getData();
  return (
    <div className={styles.mainContainer}>
      {data &&
        data?.map((item: IBlog) => (
          <div className={styles.container} key={item.id}>
            <Link href={`/blog/${item._id}`} className={styles.imageContainer}>
              <Image
                src={item.img}
                alt=""
                width={400}
                height={250}
                className={styles.image}
              />
            </Link>
            <div className={styles.content}>
              <Link href={`/blog/${item._id}`} className={styles.title}>
                {item.title}
              </Link>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Blog;
