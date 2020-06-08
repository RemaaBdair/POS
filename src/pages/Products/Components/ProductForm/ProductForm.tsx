import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { MyButton } from "../../../../Components/Button/Button";
import { MyTextField } from "../../../../Components/TextField/TextField";
import { KeyboardDatePicker } from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import ConfirmationDialog from "../../../../Components/ConfirmationDialog/ConfirmationDialog";
import { navigate, RouteComponentProps } from "@reach/router";
import { WithStyles, withStyles } from "@material-ui/core";
import {
  validateName,
  validateQuantity,
  validateExpirationDate,
  validateCode,
  validatePrice,
  validateRawPrice,
  validateCategory,
  getBase64,
} from "./util";
import { Product } from "../../util";
import {
  editProduct,
  createProduct,
  getProductById,
  fetchProducts,
} from "../../api";
import { fetchCategories } from "../../../Category/api";
import { Category } from "../../../Category/util";
import { useEditProduct } from "./hook";
import { styles } from "./styles";
type Inputs = {
  name: string;
  price: string;
  rawPrice: string;
  code: string;
  category: string;
  quantity: string;
  expirationDate: string;
};
interface Props {
  id?: string;
  onClose?: () => void;
  onSubmit?: () => void;
}
const ProductForm: React.FunctionComponent<
  RouteComponentProps & WithStyles<typeof styles> & Props
> = (props) => {
  const { classes, id = "", onClose, onSubmit } = props;
  const [selectedFile, setSelectedFile] = useState<File>({} as any);
  const { edittedProduct, isChanged, setEdittedProduct } = useEditProduct();
  React.useEffect(() => {
    if (id) getProductById(id).then((res) => setEdittedProduct(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const [disableButton, setDisableButton] = useState(false);
  const [productErrorText, setProductErrorText] = useState<Inputs>({} as any);
  const validateInputs = (edittedProduct: Inputs) => {
    return {
      name: validateName(edittedProduct.name),
      price: validatePrice(edittedProduct.price, edittedProduct.rawPrice),
      rawPrice: validateRawPrice(edittedProduct.rawPrice),
      code: validateCode(edittedProduct.code, id, products),
      category: validateCategory(edittedProduct.category),
      quantity: validateQuantity(edittedProduct.quantity),
      expirationDate: validateExpirationDate(
        edittedProduct.expirationDate?.slice(0, 10)
      ),
    };
  };
  const handleFormCancel = async (e: React.SyntheticEvent) => {
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
  const handleImageUpload = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  React.useEffect(() => {
    if (selectedFile.name)
      getBase64(selectedFile).then((data) => {
        setEdittedProduct({
          ...edittedProduct,
          image: data ? (data as string) : "",
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setProductErrorText({} as any);
    const errors = validateInputs(edittedProduct);
    if (
      (await errors.code) !== "" ||
      errors.name ||
      errors.category ||
      errors.expirationDate ||
      errors.price ||
      errors.rawPrice ||
      errors.quantity
    ) {
      setProductErrorText({ ...errors, code: await errors.code });
      console.log(errors);
      return;
    } else {
      setDisableButton(true);
      let productRes: string;
      if (id) productRes = await editProduct(edittedProduct);
      else productRes = await createProduct(edittedProduct);
      if (productRes === "success") {
        setDisableButton(false);
        if (onSubmit) onSubmit();
        else navigate("/dashboard/ProductsList/");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card classes={{ root: classes.card }}>
        <CardContent className={classes.content}>
          <MyTextField
            labelName="name"
            required={true}
            type="text"
            errorText={productErrorText.name}
            value={edittedProduct.name}
            onChange={(name) =>
              setEdittedProduct({ ...edittedProduct, name: `${name}` })
            }
          ></MyTextField>
          <MyTextField
            labelName="Raw Price"
            required={true}
            type="text"
            errorText={productErrorText.rawPrice}
            value={edittedProduct.rawPrice}
            onChange={(rawPrice) =>
              setEdittedProduct({ ...edittedProduct, rawPrice: `${rawPrice}` })
            }
          ></MyTextField>
          <MyTextField
            labelName="Price"
            required={true}
            type="text"
            value={edittedProduct.price}
            errorText={productErrorText.price}
            onChange={(price) =>
              setEdittedProduct({ ...edittedProduct, price: `${price}` })
            }
          ></MyTextField>
          <MyTextField
            labelName="Code"
            required={true}
            type="text"
            value={edittedProduct.code}
            errorText={productErrorText.code}
            onChange={(code) =>
              setEdittedProduct({ ...edittedProduct, code: `${code}` })
            }
          ></MyTextField>

          <input
            accept="image/*"
            className={classes.input}
            id="image-button"
            multiple
            type="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="image-button">
            <MyButton
              component="span"
              variant="outlined"
              fullWidth={false}
              classes={{ root: classes.button }}
            >
              Choose File
            </MyButton>
          </label>
          {selectedFile && (
            <CardMedia
              className={classes.media}
              image={edittedProduct.image}
              title={selectedFile.name}
            />
          )}

          <FormControl
            error={productErrorText.category ? true : false}
            required
          >
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              color="secondary"
              value={edittedProduct.category}
              onChange={(event) =>
                setEdittedProduct({
                  ...edittedProduct,
                  category: `${event.target.value}`,
                })
              }
            >
              {categories.map((category: Category) => {
                return (
                  <MenuItem value={category.name} key={category.name}>
                    {category.name}
                  </MenuItem>
                );
              })}
            </Select>
            {productErrorText.category && (
              <FormHelperText>{productErrorText.category}</FormHelperText>
            )}
          </FormControl>
          <MyTextField
            labelName="Product Description"
            type="text"
            multiline={true}
            value={edittedProduct.description}
            onChange={(description) =>
              setEdittedProduct({
                ...edittedProduct,
                description: `${description}`,
              })
            }
          ></MyTextField>
          <MyTextField
            labelName="Stock Count"
            required={true}
            type="text"
            value={edittedProduct.quantity}
            errorText={productErrorText.quantity}
            onChange={(quantity) =>
              setEdittedProduct({ ...edittedProduct, quantity: `${quantity}` })
            }
          ></MyTextField>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            id="date"
            label="Expiration Date"
            color="secondary"
            error={productErrorText.expirationDate ? true : false}
            helperText={productErrorText.expirationDate}
            value={edittedProduct.expirationDate}
            onChange={(expirationDate) =>
              setEdittedProduct({
                ...edittedProduct,
                expirationDate: `${expirationDate?.toJSON()}`,
              })
            }
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </CardContent>
        <CardActions className={classes.controls}>
          <MyButton
            onClick={handleSubmit}
            size="large"
            variant="contained"
            type="submit"
            disable={disableButton}
            fullWidth={false}
            classes={{ root: classes.button }}
          >
            Submit
          </MyButton>
          {disableButton ? (
            <CircularProgress
              color="secondary"
              size={68}
              classes={{ root: classes.propgress }}
            />
          ) : null}
          <MyButton
            type="submit"
            onClick={handleFormCancel}
            size="large"
            variant="contained"
            fullWidth={false}
            classes={{ root: classes.button }}
          >
            Cancel
          </MyButton>
        </CardActions>
      </Card>
      <ConfirmationDialog
        openDialog={openDialog}
        message="Your data will be lost, Are you sure you want to cancel?"
        onSubmit={handleDialogSubmit}
        onClose={handleDialogClose}
      />
    </form>
  );
};
export default withStyles(styles)(ProductForm);
