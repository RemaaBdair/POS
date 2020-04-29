import React from "react";
import PageButtons from "./PageButton";
import { number } from "@storybook/addon-knobs";
export default {
  title: "CategoryPage",
};

const currentPageNumber = number("page", 0);
export const PageButton = () => (
  <PageButtons currentPageNumber={currentPageNumber} />
);
