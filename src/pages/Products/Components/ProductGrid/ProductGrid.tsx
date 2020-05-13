import React, { useState, useEffect } from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { RouteComponentProps } from "@reach/router";
import ProductsList from "../ProductsList/ProductsList";
import { MyTextField } from "../../../../Components/TextField/TextField";
import { MyButton } from "../../../../Components/Button/Button";
import FilterGrid from "../FilterGrid/FilterGrid";
import { styles } from "./styles";
import { Product, fetchProducts, filterData } from "../ProductsList/util";
const ProductGrid: React.FunctionComponent<
  WithStyles<typeof styles> & SvgIconProps & RouteComponentProps
> = (props) => {
  const { classes } = props;
  const [productsData, setProductsData] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts().then((res) => setProductsData(res));
  }, []);
  const [searchText, setSearchText] = useState("");
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };
  const [startDate, setSelectedStartDate] = React.useState<Date | null>(null);
  const [endDate, setSelectedEndDate] = React.useState<Date | null>(null);
  const handleInitDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
    if (!date) onFetchProducts(); //on Clear date field
  };
  const handleEndDateChange = (date: Date | null) => {
    setSelectedEndDate(date);
    if (!date) onFetchProducts();
  };
  const onFetchProducts = () => {
    fetchProducts().then((res) => setProductsData(res));
  };
  const applyFilter = async () => {
    const data = await fetchProducts();
    const filteredData = filterData(
      {
        filterOption1: "more than or equal",
        filterValue1: startDate ? startDate.toJSON().slice(0, 10) : null,
        filter1By: "expirationDate",
        filterOption2: "less than or equal",
        filterValue2: endDate ? endDate.toJSON().slice(0, 10) : null,
        filter2By: "expirationDate",
      },
      data
    );
    setProductsData(filteredData);
  };
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} justify="flex-end" container>
        <FilterGrid
          startDate={startDate}
          endDate={endDate}
          onInitDateChange={handleInitDateChange}
          onEndDateChange={handleEndDateChange}
          onClick={applyFilter}
        />
      </Grid>
      <Grid item xs={6}>
        <MyButton
          onClick={() => {}}
          type="submit"
          variant="contained"
          fullWidth={false}
        >
          Add Product
        </MyButton>
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
        <ProductsList
          searchText={searchText}
          productsData={productsData}
          onFetchProducts={onFetchProducts}
        />
      </Grid>
    </Grid>
  );
};
export default withStyles(styles)(ProductGrid);
