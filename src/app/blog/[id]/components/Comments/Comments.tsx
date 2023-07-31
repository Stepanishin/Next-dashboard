"use client";

import React, { useEffect, useState } from "react";
import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";
import styles from "./Comments.module.scss";
import { useSession } from "next-auth/react";

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

const commentsData: CommentType[] = [
  {
    id: "1",
    body: "First comment",
    username: "Evgenii Google",
    parentId: null,
    createdAt: "2021-08-16T23:00:33.010+02:00",
    avatar:
      "https://lh3.googleusercontent.com/a/AAcHTtdqbhk8IgQsOmQ0yxbFzl2qdwzY-tqUCnz83-eBNZkhfQ=s96-c",
    stars: 4,
  },
  {
    id: "2",
    body: "Second comment",
    username: "Evgenii Google",
    parentId: null,
    createdAt: "2021-08-16T23:00:33.010+02:00",
    avatar:
      "https://lh3.googleusercontent.com/a/AAcHTtdqbhk8IgQsOmQ0yxbFzl2qdwzY-tqUCnz83-eBNZkhfQ=s96-c",
    stars: 2,
  },
  {
    id: "3",
    body: "First comment first child",
    username: "Evgenii Google",
    parentId: "1",
    createdAt: "2021-08-16T23:00:33.010+02:00",
    avatar:
      "https://lh3.googleusercontent.com/a/AAcHTtdqbhk8IgQsOmQ0yxbFzl2qdwzY-tqUCnz83-eBNZkhfQ=s96-c",
  },
  {
    id: "4",
    body: "Second comment second child",
    username: "Evgenii Google",
    parentId: "2",
    createdAt: "2021-08-16T23:00:33.010+02:00",
    avatar:
      "https://lh3.googleusercontent.com/a/AAcHTtdqbhk8IgQsOmQ0yxbFzl2qdwzY-tqUCnz83-eBNZkhfQ=s96-c",
  },
];

const Comments = ({ blogId }: { blogId: string }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isVisibleForm, setIsVisibleForm] = useState(false);

  const session = useSession();

  useEffect(() => {
    const map: any = {},
      nodeArray: CommentType[] = [];
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
    // TODO: add sending comment to the server
    return false;
  };

  const addComment = (
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

  const removeComment = (id: string) => {
    // TODO: Add logic for delete comment
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
    </div>
  );
};

export default Comments;
