import React from "react";
import Box from "@material-ui/core/Box";
import { RouteComponentProps } from "@reach/router";
import ProductGrid from "./Components/ProductGrid/ProductGrid";
const ProductPage: React.FunctionComponent<RouteComponentProps> = (props) => {
  return (
    <Box>
      <ProductGrid />
    </Box>
  );
};
export default ProductPage;
