import React from "react";
import styles from "./page.module.scss";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { Item, ItemsCategory, items } from "./data";
import { notFound } from "next/navigation";

interface CategoryProps {
  params: {
    categoryName: string;
  };
}

const getData = (categoryName: string): Item[] | undefined | any => {
  const keys: (keyof ItemsCategory)[] = [
    "applications",
    "illustrations",
    "websites",
  ];
  if (!keys.includes(categoryName as keyof ItemsCategory)) {
    return notFound;
  }
  return items[categoryName as keyof ItemsCategory];
};

const Category: React.FC<CategoryProps> = ({ params }) => {
  const data = getData(params.categoryName);

  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{params.categoryName}</h1>

      {data.map((item: Item) => (
        <div className={styles.item} key={item.id}>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
            <Button label="See More" url="#" />
          </div>
          <div className={styles.imgContainer}>
            <Image className={styles.img} fill={true} src={item.image} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
