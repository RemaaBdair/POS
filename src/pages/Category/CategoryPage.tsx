import React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "@reach/router";
import Header from "../../components/Header/Header";
import CategoryGrid from "./components/CategoryGrid/CategoryGrid";
import { styles } from "./styles";
const CategoryPage: React.FunctionComponent<
  WithStyles<typeof styles> & RouteComponentProps
> = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Header />
      <CategoryGrid />
    </div>
  );
};
export default withStyles(styles)(CategoryPage);
