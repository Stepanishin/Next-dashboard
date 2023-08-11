"use client";

import React, { useEffect, useState } from "react";
import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";
import styles from "./Comments.module.scss";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import toast, { Toaster } from "react-hot-toast";

export interface CommentType {
  id: string;
  body: string;
  username: string;
  parentId: string | null;
  createdAt: string;
  children?: CommentType[];
  stars?: number;
  avatar?: string;
}

const Comments = ({
  blogId,
  commentsData,
}: {
  blogId: string;
  commentsData: CommentType[] | null;
}) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isVisibleForm, setIsVisibleForm] = useState(false);

  const session = useSession();

  type FetchArgs = [input: RequestInfo, init?: RequestInit | undefined];
  const fetcher = (...args: FetchArgs) =>
    fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  useEffect(() => {
    const map: any = {},
      nodeArray: CommentType[] = [];
    if (commentsData === null) return;
    commentsData.forEach((node) => {
      node.children = [];
      map[node.id] = node;
      if (node.parentId === null) {
        nodeArray.push(node);
      } else {
        map[node.parentId].children.push(node);
      }
    });
    setComments(nodeArray);
  }, []);

  const findAndAddComment = (
    commentArray: CommentType[],
    parentId: string,
    newComment: CommentType
  ) => {
    for (let comment of commentArray) {
      if (comment.id === parentId) {
        comment.children.push(newComment);
        return true;
      }
      if (
        comment.children &&
        findAndAddComment(comment.children, parentId, newComment)
      ) {
        return true;
      }
    }
    return false;
  };

  const addComment = async (
    body: string,
    parentId: string | null,
    stars?: number
  ) => {
    setIsVisibleForm(false);

    const newComment: CommentType = {
      id: Date.now().toString(),
      body,
      username: session?.data?.user?.name || "Anonymous",
      parentId,
      createdAt: new Date().toISOString(),
      children: [],
      avatar: session?.data?.user?.image || "",
      stars: stars,
    };

    try {
      await fetch(`http://localhost:3000/api/posts/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "add",
          id: blogId,
          commentsData: newComment,
        }),
      });
      mutate();
      toast.success("Comment has been added");
    } catch (err) {
      toast.error("Something went wrong!");
    }

    if (parentId) {
      setComments((prevComments) => {
        const newComments = [...prevComments];
        findAndAddComment(newComments, parentId, newComment);
        return newComments;
      });
    } else {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  };

  const removeCommentById = (
    commentArray: CommentType[],
    commentId: string
  ): boolean => {
    for (let i = 0; i < commentArray.length; i++) {
      if (commentArray[i].id === commentId) {
        commentArray.splice(i, 1);
        return true;
      }
      if (
        commentArray[i].children &&
        removeCommentById(commentArray[i].children, commentId)
      ) {
        return true;
      }
    }
    return false;
  };

  const removeComment = async (commentId: string) => {
    console.log(commentId);
    try {
      await fetch(`http://localhost:3000/api/posts/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "delete", commentId }),
      });
      mutate();
      toast.success("Comment has been deleted");
    } catch (err) {
      toast.error("Something went wrong!");
    }
    setComments((prevComments) => {
      const newComments = [...prevComments];
      removeCommentById(newComments, commentId);
      return newComments;
    });
  };

  const openForm = () => {
    setIsVisibleForm(true);
  };

  return (
    <div>
      <button className={styles.comments_add__button} onClick={openForm}>
        Add Comment
      </button>
      {isVisibleForm && (
        <CommentForm
          addComment={addComment}
          closeForm={() => setIsVisibleForm(false)}
          blogId={blogId}
        />
      )}
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          removeComment={removeComment}
          addComment={addComment}
          blogId={blogId}
        />
      ))}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Comments;
