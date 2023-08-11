"use client";

import React, { useEffect, useState } from "react";
import CommentForm from "../CommentForm/CommentForm";
import { CommentType } from "../Comments/Comments";
import styles from "./Comment.module.scss";
import Image from "next/image";
import StarsRaiting from "@/components/StarsRaiting/StarsRaiting";
import { useSession } from "next-auth/react";

const Comment = ({
  comment,
  removeComment,
  addComment,
  blogId,
}: {
  comment: CommentType;
  removeComment: (blogId: string) => void;
  addComment: Function;
  blogId: string;
}) => {
  const [isReplying, setIsReplying] = useState(false);

  const startReply = () => setIsReplying(true);
  const stopReply = () => setIsReplying(false);

  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const session = useSession();

  useEffect(() => {
    if (
      session?.data?.user.name === comment.username &&
      comment.username !== "Anonymous"
    ) {
      setIsCurrentUser(true);
    }
  }, [session?.data?.user.name, comment.username]);

  return (
    <div style={{ marginLeft: comment.parentId ? 40 : 0 }}>
      <div>
        <Image
          src={comment.avatar ? comment.avatar : "/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className={styles.avatar}
        />
        <p>{comment.username}</p>
      </div>
      {comment.stars && (
        <div>
          <StarsRaiting value={comment.stars} isEditable={false} />
        </div>
      )}
      <div>
        <p>{comment.body}</p>
      </div>
      <button className={styles.comment_replay__button} onClick={startReply}>
        Reply
      </button>
      {isCurrentUser && (
        <button
          className={styles.comment_replay__button}
          onClick={() => removeComment(comment.id)}
        >
          Delete
        </button>
      )}

      {isReplying && (
        <CommentForm
          addComment={(body, parentId) => {
            addComment(body, parentId);
            stopReply();
          }}
          parentId={comment.id}
          closeForm={stopReply}
          blogId={blogId}
        />
      )}

      {comment.children.map((childComment) => (
        <Comment
          key={childComment.id}
          comment={childComment}
          removeComment={removeComment}
          addComment={addComment}
          blogId={blogId}
        />
      ))}
    </div>
  );
};

export default Comment;
