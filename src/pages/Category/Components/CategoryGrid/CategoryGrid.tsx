import React, { useState, useEffect } from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { RouteComponentProps } from "@reach/router";
import CategoriesList from "../CategoriesList/CategoriesList";
import { MyTextField } from "../../../../Components/TextField/TextField";
import { MyButton } from "../../../../Components/Button/Button";
import EditCategoryDialog from "../EditCategoryDialog/EditCategoryDialog";
import { styles } from "./styles";
import { Category, fetchCategories } from "../CategoriesList/util";
const CategoryGrid: React.FunctionComponent<
  WithStyles<typeof styles> & SvgIconProps & RouteComponentProps
> = (props) => {
  const { classes } = props;
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  useEffect(() => {
    fetchCategories().then((res) => setCategoryData(res));
  }, []);
  const [searchText, setSearchText] = useState("");
  const [categoryName, setCategoryName] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCategoryName("");
  };
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };
  return (
    <Grid container className={classes.container}>
      <Grid item xs={6}>
        <MyButton
          OnClickHandle={() => setOpenDialog(true)}
          type="submit"
          variant="contained"
          fullWidth={false}
        >
          Add Category
        </MyButton>

        <EditCategoryDialog
          openDialog={openDialog}
          handleClose={handleCloseDialog}
          setName={setCategoryName}
          name={categoryName}
        />
      </Grid>

      <Grid item xs={6} justify="flex-end" container>
        <MyTextField
          fullWidth={false}
          labelName="Search"
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
        />
      </Grid>

      <Grid item xs={12} justify="center" container>
        <CategoriesList searchText={searchText} categoryData={categoryData} />
      </Grid>
    </Grid>
  );
};
export default withStyles(styles)(CategoryGrid);
