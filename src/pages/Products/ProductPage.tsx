import React from "react";
import Box from "@material-ui/core/Box";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "@reach/router";
import Header from "../../Components/Header/Header";
import ProductGrid from "./Components/ProductGrid/ProductGrid";
const CategoryPage: React.FunctionComponent<RouteComponentProps> = (props) => {
  // const { classes } = props;
  return (
    <Box>
      <Header />
      <ProductGrid />
    </Box>
  );
};
export default CategoryPage;
