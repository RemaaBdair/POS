import React from "react";
import Box from "@material-ui/core/Box";
import ProductForm from "../ProductForm/ProductForm";
import { RouteComponentProps } from "@reach/router";
interface Props extends RouteComponentProps {
  id?: string;
}
const ProductFormPage: React.FunctionComponent<Props> = (props) => {
  const { id } = props;
  return (
    <Box mt={8}>
      <ProductForm id={id} />
    </Box>
  );
};

export default ProductFormPage;
