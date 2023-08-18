"use client";

import styles from "./page.module.scss";
import { getStoryblokApi } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";

interface CategoryProps {
  params: {
    categoryName: string;
  };
}

export async function getData(params) {
  let sbParams = {
    version: "published",
    starts_with: `portfolio/${params.categoryName}`,
  };

  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/`, sbParams);
}

// eslint-disable-next-line @next/next/no-async-client-component
const Category: React.FC<CategoryProps> = async ({ params }) => {
  const data = await getData(params).then((res) => res.data);

  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{params.categoryName}</h1>
      {data &&
        data.stories.map((item: any, index) => {
          return <StoryblokStory story={item} key={index} />;
        })}
    </div>
  );
};

export default Category;
