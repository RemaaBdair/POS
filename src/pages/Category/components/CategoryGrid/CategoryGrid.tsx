import React, { useState } from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { RouteComponentProps } from "@reach/router";
import CategoriesList from "../CategoriesList/CategoriesList";
import { MyTextField } from "../../../../Components/TextField/TextField";
import { MyButton } from "../../../../Components/Button/Button";
import SelectMenu from "../SelectMenu/SelectMenu";
import PageButtons from "../PageButtons/PageButton";
import EditCategoryDialog from "../EditCategoryDialog/EditCategoryDialog";
import { styles } from "./styles";
const CategoryGrid: React.FunctionComponent<
  WithStyles<typeof styles> & SvgIconProps & RouteComponentProps
> = (props) => {
  const { classes } = props;
  const [searchText, setSearchText] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPageNumber, setCurrentPagesNumber] = useState(0);
  const [nextPageEntries, setNextPageEntries] = useState(0);
  const [entriesLength, setEntriesLength] = useState(0);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState("");
  const [categoryAdded, setCategoryAdded] = useState(false);
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };
  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEntriesPerPage(event.target.value as string);
  };
  const handleNextPageEntries = (value: number) => {
    setNextPageEntries(value);
  };
  const handleEntriesLength = (value: number) => {
    setEntriesLength(value);
  };
  const getNextPage = () => {
    const pageNumber = currentPageNumber + 1;
    setCurrentPagesNumber(pageNumber);
  };
  const getPrevPage = () => {
    const pageNumber = currentPageNumber - 1;
    setCurrentPagesNumber(pageNumber);
  };
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.selectMenuContainer}>
        <SelectMenu
          onSelectChange={handleSelectChange}
          entriesPerPage={entriesPerPage}
        />
      </Grid>

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
          OnChangehandle={handleSearchTextChange}
        />
      </Grid>

      <Grid item xs={12} justify="center" container>
        <CategoriesList
          searchText={searchText}
          entriesPerPage={Number(entriesPerPage)}
          currentPageNumber={currentPageNumber}
          handleNextPageEntries={handleNextPageEntries}
          handleEntriesLength={handleEntriesLength}
          refresh={categoryAdded}
        />
      </Grid>

      <Grid item xs={12} className={classes.showEntriesLabel}>
        <Typography component="span" color="inherit">
          Showing {currentPageNumber * Number(entriesPerPage) + 1} to{" "}
          {nextPageEntries >= 0
            ? entriesLength - nextPageEntries
            : entriesLength}{" "}
          entries from {entriesLength}
        </Typography>
      </Grid>

      <Grid item xs={12} alignItems="center" justify="flex-end" container>
        <PageButtons
          getNextPage={getNextPage}
          getPrevPage={getPrevPage}
          currentPageNumber={currentPageNumber}
          nextPageEntries={nextPageEntries}
        />
      </Grid>
    </Grid>
  );
};
export default withStyles(styles)(CategoryGrid);
