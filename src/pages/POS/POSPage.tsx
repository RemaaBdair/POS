import React from "react";
import Grid from "@material-ui/core/Grid";
import { RouteComponentProps } from "@reach/router";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import StockItems from "./Components/StockItems/StockItems";
import Cart from "./Components/Cart/Cart";

import { styles } from "./styles";
const POSPage: React.FunctionComponent<
  WithStyles<typeof styles> & RouteComponentProps
> = (props) => {
  const { classes } = props;
  return (
    <Grid container className={classes.container}>
      <Grid item xs={6} justify="flex-start" container>
        <Cart />
      </Grid>
      <Grid item xs={6} justify="flex-end" container>
        <StockItems />
      </Grid>
    </Grid>
  );
};
export default withStyles(styles)(POSPage);
