import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import { Category } from "../../../Category/util";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
interface Props {
  activeFilter: string | null; //category perhaps
  categories: Category[];
  onClick: (categoryName: string | null) => void;
}
export const CategoryFilter: React.FunctionComponent<
  WithStyles<typeof styles> & Props
> = (props) => {
  const { classes, activeFilter, categories, onClick } = props;
  console.log(categories);
  return (
    <Grid container alignItems="flex-start">
      <Button
        id="home"
        type="button"
        variant="outlined"
        onClick={() => onClick(null)}
        classes={
          activeFilter === null
            ? { root: classes.activeFilter }
            : { root: classes.inActiveFilter }
        }
      >
        <HomeIcon />
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id + "category"}
          onClick={() => onClick(category.name)}
          type="button"
          variant="outlined"
          className={classes.button}
          classes={
            activeFilter === category.name
              ? { root: classes.activeFilter }
              : { root: classes.inActiveFilter }
          }
        >
          {category.name}
        </Button>
      ))}
    </Grid>
  );
};
export default withStyles(styles)(CategoryFilter);
