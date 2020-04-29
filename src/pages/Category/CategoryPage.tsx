import React, { useState } from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { RouteComponentProps } from "@reach/router";
import Header from "../../components/Header/Header";
import CategoriesList from "./components/CategoriesList/CategoriesList";
import { MyTextField } from "../../components/TextField/TextField";
import { MyButton } from "../../components/Button/Button";
import SelectMenu from "./components/selectMenu/SelectMenu";
import PageButtons from "./components/PageButtons/PageButton";
import { styles } from "./styles";
const CategoryPage: React.FunctionComponent<
  WithStyles<typeof styles> & SvgIconProps & RouteComponentProps
> = (props) => {
  const { classes } = props;
  const [searchText, setSearchText] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPageNumber, setCurrentPagesNumber] = useState(0);
  const [nextPageEntries, setNextPageEntries] = useState(0);
  const [entriesLength, setEntriesLength] = useState(0);
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
    <div className={classes.root}>
      <Header />
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.selectMenuContainer}>
          <SelectMenu
            onSelectChange={handleSelectChange}
            entriesPerPage={entriesPerPage}
          />
        </Grid>

        <Grid item xs={6}>
          <MyButton
            OnClickHandle={(event) => {}}
            type="submit"
            variant="contained"
            fullWidth={false}
          >
            Add Category
          </MyButton>
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
    </div>
  );
};
export default withStyles(styles)(CategoryPage);
