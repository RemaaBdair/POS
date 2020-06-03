import React from "react";
import DeleteDialog from "./DeleteDialog";

export default {
  title: "Dialogs",
};

export const deleteDialog = () => (
  <DeleteDialog openDialog={true} name="product1" label="Product" />
);
