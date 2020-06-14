import React, { useState } from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { State } from "../../../../reducers";
import { selectCategories } from "../../../../selectors";
import { connect, ConnectedProps } from "react-redux";
import ItemsList from "./ItemsList";
import CategoryFilter from "./CategoryFilter";
import { styles } from "./styles";
type PropsFromRedux = ConnectedProps<typeof connector>;
const StockItems: React.FunctionComponent<
  WithStyles<typeof styles> & PropsFromRedux
> = (props) => {
  const { classes, categories } = props;
  const [searchText, setSearchText] = useState("");
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };
  //typeof categories.name
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const handleFilterChange = (categoryName: string | null) => {
    setCategoryFilter(categoryName);
  };
  return (
    <Grid container>
      <Grid item xs={12} justify="flex-start" container>
        <CategoryFilter
          activeFilter={categoryFilter}
          onClick={handleFilterChange}
          categories={categories}
        />
      </Grid>

      <Grid
        item
        xs={12}
        justify="flex-start"
        container
        classes={{ root: classes.searchText }}
      >
        <TextField
          label="Search"
          type="text"
          value={searchText}
          fullWidth={true}
          onChange={(event) => handleSearchTextChange(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} justify="flex-start" container>
        <ItemsList searchText={searchText} categoryFilter={categoryFilter} />
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state: State) => ({
  categories: selectCategories(state),
});

const connector = connect(mapStateToProps);
const WrappedComponent = connector(StockItems);
export default withStyles(styles)(WrappedComponent);
