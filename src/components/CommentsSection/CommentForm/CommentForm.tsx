"use client";

import React, { useState } from "react";
import styles from "./CommentForm.module.scss";
import StarsRaiting from "@/components/StarsRaiting/StarsRaiting";

const CommentForm = ({
  addComment,
  parentId = null,
  closeForm,
  blogId,
}: {
  addComment: Function;
  parentId?: string | null;
  closeForm: Function;
  blogId: string;
}) => {
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment) {
      addComment(comment, parentId, stars);
      setComment("");
    }
  };

  return (
    <div className={styles.overlay}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <span onClick={() => closeForm()} className={styles.form__close}>
          X
        </span>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          required
          className={styles.form__input}
        />
        {parentId === null && <StarsRaiting setStars={setStars} />}
        <button className={styles.form__submit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
