import React from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
import styles from "./CategoryItem.module.scss";

const CategoryItem = async ({ blok }) => {
  return (
    <div className={styles.item}>
      {blok && (
        <>
          <div className={styles.content}>
            <h1 className={styles.title}>{blok.title}</h1>
            <p className={styles.desc}>{blok.desc}</p>
            <Button label="See More" url="#" />
          </div>
          <div className={styles.imgContainer}>
            <Image className={styles.img} fill={true} src={blok.image} alt="" />
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryItem;
