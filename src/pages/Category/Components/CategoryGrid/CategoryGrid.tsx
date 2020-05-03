import React, { useState } from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { RouteComponentProps } from "@reach/router";
import CategoriesList from "../CategoriesList/CategoriesList";
import { MyTextField } from "../../../../Components/TextField/TextField";
import { MyButton } from "../../../../Components/Button/Button";
import EditCategoryDialog from "../EditCategoryDialog/EditCategoryDialog";
import { styles } from "./styles";
const CategoryGrid: React.FunctionComponent<
  WithStyles<typeof styles> & SvgIconProps & RouteComponentProps
> = (props) => {
  const { classes } = props;
  const [searchText, setSearchText] = useState("");
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState("");
  const [categoryAdded, setCategoryAdded] = useState(false);
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };
  return (
    <Grid container className={classes.container}>
      <Grid item xs={6}>
        <MyButton
          OnClickHandle={() => setOpenEditDialog(true)}
          type="submit"
          variant="contained"
          fullWidth={false}
        >
          Add Category
        </MyButton>

        <EditCategoryDialog
          openDialog={openEditDialog}
          handleClose={() => {
            setOpenEditDialog(false);
            setCategoryAdded(true);
            setCategoryName("");
            setInterval(() => {
              setCategoryAdded(false);
            }, 6000);
          }}
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
        <CategoriesList searchText={searchText} refresh={categoryAdded} />
      </Grid>
    </Grid>
  );
};
export default withStyles(styles)(CategoryGrid);
