import React from "react";
import DetailsDialog from "./DetailsDialog";

export default {
  title: "Dialogs",
};
const product = {
  id: "1",
  code: "123321",
  name: "Clothes",
  category: "Clothes",
  description: "Female clothes",
  tax: "14%",
  price: "100.00$",
  expirationDate: "2020-08-20",
  image: "",
  count: "12",
  rawPrice: "standard",
};
export const detailsDialog = () => (
  <DetailsDialog openDialog={true} product={product} />
);
