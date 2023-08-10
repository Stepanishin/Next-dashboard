"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/dashboard/login");
    }
  }, [session, router]);

  type FetchArgs = [input: RequestInfo, init?: RequestInit | undefined];

  const fetcher = (...args: FetchArgs) =>
    fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    let img = e.target[2].value;
    const isImageUrl = (url) => {
      return (
        url.startsWith("https://") ||
        (url.startsWith("http://") &&
          /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url))
      );
    };
    const defaultImageUrl =
      "https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    img = isImageUrl(img) ? img : defaultImageUrl;
    const content = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
          rate: 5,
          commentsData: [],
        }),
      });
      mutate();
      e.target.reset();
      toast.success("Post has been added");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
      toast.success("Post has been deleted");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading
            ? "loading"
            : data?.map((post) => (
                <div className={styles.post} key={post._id}>
                  <div className={styles.imgContainer}>
                    <Image src={post.img} alt="" width={200} height={100} />
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <span
                    className={styles.delete}
                    onClick={() => handleDelete(post._id)}
                  >
                    X
                  </span>
                </div>
              ))}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type="text" placeholder="Title" className={styles.input} />
          <input type="text" placeholder="Desc" className={styles.input} />
          <input type="text" placeholder="Image" className={styles.input} />
          <textarea
            placeholder="Content"
            className={styles.textArea}
            cols={30}
            rows={10}
          ></textarea>
          <button className={styles.button}>Send</button>
        </form>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    );
  }
};

export default Dashboard;
