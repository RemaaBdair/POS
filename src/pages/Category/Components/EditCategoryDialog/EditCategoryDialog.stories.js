import React from "react";
import EditCategoryDialog from "./EditCategoryDialog";

export default {
  title: "Dialogs",
};
export const editCategoryDialog = () => (
  <EditCategoryDialog openDialog={true} name="category" />
);
