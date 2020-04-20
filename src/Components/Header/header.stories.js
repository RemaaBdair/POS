import React from "react";
import Header from "./Header";
import CategoryMenu from "./CategoryMenu";
import PeopleMenue from "./PeopleMenue";

export default {
  title: "Header",
};
export const peopleMenue = () => <PeopleMenue />;
export const categoryMenu = () => <CategoryMenu />;
export const AppHeader = () => <Header />;
