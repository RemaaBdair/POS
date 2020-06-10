import React, { useState } from "react";
import { Formik, Field, Form, FormikProps } from "formik";
import TextField from "@material-ui/core/TextField";
import * as Yup from "yup";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { MyButton } from "../../../../Components/Button/Button";
import { KeyboardDatePicker } from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import ConfirmationDialog from "../../../../Components/ConfirmationDialog/ConfirmationDialog";
import { navigate, RouteComponentProps } from "@reach/router";
import ImageUpload from "./ImageUpload";
import { WithStyles, withStyles } from "@material-ui/core";
import { validateUniqueCode } from "./util";
import { Product } from "../../util";
import {
  editProduct,
  createProduct,
  getProductById,
  fetchProducts,
} from "../../api";
import { fetchCategories } from "../../../Category/api";
import { Category } from "../../../Category/util";
import { styles } from "./styles";
interface Props {
  id?: string;
  onClose?: () => void;
  onSubmit?: () => void;
}
let initProduct: Product = {
  id: "",
  code: "",
  name: "",
  category: "",
  description: "",
  price: "",
  tax: "2%",
  expirationDate: new Date().toJSON().slice(0, 10),
  image: "",
  quantity: "",
  rawPrice: "",
};

const ProductForm: React.FunctionComponent<
  RouteComponentProps & WithStyles<typeof styles> & Props
> = (props) => {
  const { classes, id = "", onClose, onSubmit } = props;
  const [product, setProduct] = useState<Product>(initProduct);
  React.useEffect(() => {
    id
      ? getProductById(id).then((data) =>
          setProduct({
            ...data,
            price: data.price.slice(0, -1),
            rawPrice: data.rawPrice.slice(0, -1),
          })
        )
      : setProduct(initProduct);
  }, []);
  const [categories, setCategories] = useState<Category[]>([]);
  React.useEffect(() => {
    fetchCategories().then((res) => setCategories(res));
  }, []);
  const [products, setProducts] = useState<Product[]>([]);
  React.useEffect(() => {
    fetchProducts().then((res) => setProducts(res));
  }, []);
  const [openDialog, setOpenDialog] = useState(false);
  const handleFormCancel = async (
    e: React.SyntheticEvent,
    isChanged: boolean
  ) => {
    if (isChanged) setOpenDialog(true);
    else {
      if (onClose) onClose();
      else navigate("/dashboard/ProductsList/");
    }
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleDialogSubmit = () => {
    if (onClose) onClose();
    else navigate("/dashboard/ProductsList/");
  };
  return (
    <>
      <Formik
        initialValues={product}
        enableReinitialize={true}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          code: Yup.string()
            .matches(
              /^([a-zA-Z0-9]+)$/,
              "Code contains alphabets and numbers only."
            )
            .test(
              "uniqueCode",
              "This code is already used. Try another one!",
              (code: any) => !validateUniqueCode(code, id, products)
            )
            .required("Required"),
          price: Yup.number()
            .moreThan(0)
            .when("rawPrice", (rawPrice: any, schema: any) => {
              return rawPrice ? schema.moreThan(rawPrice) : schema.moreThan(0);
            })
            .required("Required"),
          rawPrice: Yup.number().moreThan(0).required("Required"),
          category: Yup.string().required("Required"),
          quantity: Yup.number().required("Required"),
          expirationDate: Yup.date().min(new Date().toJSON().slice(0, 10)),
          image: Yup.string(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          let productRes: string;
          if (id) productRes = await editProduct(values as Product);
          else productRes = await createProduct(values as Product);
          if (productRes === "success") {
            setSubmitting(false);
            if (onSubmit) onSubmit();
            else navigate("/dashboard/ProductsList/");
          }
        }}
        render={(props: FormikProps<any>) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleSubmit,
            handleBlur,
            dirty,
          } = props;

          return (
            <Form>
              <Card classes={{ root: classes.card }}>
                <CardContent className={classes.content}>
                  <Field
                    name="name"
                    component={TextField}
                    onChange={handleChange}
                    value={values.name}
                    label="Name"
                    helperText={errors.name && touched.name && errors.name}
                    error={errors.name ? true : false}
                  />

                  <Field
                    id="rawPrice"
                    value={values.rawPrice}
                    component={TextField}
                    onChange={handleChange}
                    label="Raw Price"
                    helperText={
                      errors.rawPrice && touched.rawPrice && errors.rawPrice
                    }
                    error={errors.rawPrice ? true : false}
                  />

                  <Field
                    component={TextField}
                    label="Price"
                    id="price"
                    value={values.price}
                    onChange={handleChange}
                    helperText={errors.price && touched.price && errors.price}
                    error={errors.price ? true : false}
                  />

                  <Field
                    component={TextField}
                    label="Code"
                    id="code"
                    value={values.code}
                    onChange={handleChange}
                    helperText={errors.code && touched.code && errors.code}
                    error={errors.code ? true : false}
                  />
                  <ImageUpload name="image" label="Choose Image" />
                  {values.image && (
                    <CardMedia
                      className={classes.media}
                      image={values.image}
                      title={values.image}
                    />
                  )}

                  <FormControl>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                      value={values.category}
                      onChange={handleChange}
                      id="category-label-placeholder"
                      name="category"
                    >
                      {categories.map((category: Category) => {
                        return (
                          <MenuItem value={category.name} key={category.name}>
                            {category.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {errors.category && (
                      <FormHelperText>{errors.category}</FormHelperText>
                    )}
                  </FormControl>

                  <Field
                    component={TextField}
                    label="description"
                    id="description"
                    value={values.description}
                    onChange={handleChange}
                    multiline={true}
                    rows={5}
                    helperText={
                      errors.description &&
                      touched.description &&
                      errors.description
                    }
                    error={errors.description ? true : false}
                  />
                  <Field
                    component={TextField}
                    label="Quantity"
                    id="quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.quantity && touched.quantity && errors.quantity
                    }
                    error={errors.quantity ? true : false}
                  />
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date"
                    label="Expiration Date"
                    color="secondary"
                    error={errors.expirationDate ? true : false}
                    helperText={errors.expirationDate}
                    value={values.expirationDate}
                    onChange={handleChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </CardContent>
                <CardActions className={classes.controls}>
                  <MyButton
                    size="large"
                    onClick={() => handleSubmit}
                    variant="contained"
                    type="submit"
                    disable={isSubmitting}
                    fullWidth={false}
                    classes={{ root: classes.button }}
                  >
                    Submit
                  </MyButton>
                  {isSubmitting ? (
                    <CircularProgress
                      color="secondary"
                      size={68}
                      classes={{ root: classes.propgress }}
                    />
                  ) : null}
                  <MyButton
                    onClick={(event) => handleFormCancel(event, dirty)}
                    size="large"
                    variant="contained"
                    fullWidth={false}
                    classes={{ root: classes.button }}
                  >
                    Cancel
                  </MyButton>
                </CardActions>
              </Card>
            </Form>
          );
        }}
      />
      <ConfirmationDialog
        openDialog={openDialog}
        message="Your data will be lost, Are you sure you want to cancel?"
        onSubmit={handleDialogSubmit}
        onClose={handleDialogClose}
      />
    </>
  );
};
export default withStyles(styles)(ProductForm);
