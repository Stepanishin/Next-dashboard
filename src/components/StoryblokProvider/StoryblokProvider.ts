"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import CategoryItem from "../Portfolio/CategoryItem/CategoryItem";

const components = {
  CategoryItem: CategoryItem,
};

storyblokInit({
  accessToken: process.env.storyblokApiToken,
  use: [apiPlugin],
  components,
});

export default function StoryblokProvider({ children }) {
  return children;
}
