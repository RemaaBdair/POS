import React, { useState } from "react";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";
import { styles } from "./styles";
const CategoryMenu: React.FunctionComponent<WithStyles<typeof styles>> = (
  props
) => {
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();
  const [anchorCategories, setAnchorCategories] = useState<null | HTMLElement>(
    null
  );
  const handleCategoriesClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorCategories(event.currentTarget);
  };
  const handleCategoriesClose = () => {
    setAnchorCategories(null);
  };
  return (
    <Typography className={props.classes.listItem} color="primary">
      <BookmarkIcon color="primary" fontSize="small" />
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="primary"
        onClick={handleCategoriesClick}
      >
        Categories
      </Button>

      <Menu
        id="category-menu"
        anchorEl={anchorCategories}
        keepMounted
        open={Boolean(anchorCategories)}
        onClose={handleCategoriesClose}
      >
        <MenuItem onClick={handleCategoriesClose}>
          <Typography className={props.classes.listItem} color="primary">
            <ReceiptIcon color="primary" fontSize="small" />
            <Link href="/" onClick={preventDefault} color="inherit">
              Sales
            </Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCategoriesClose}>
          <Typography className={props.classes.listItem} color="primary">
            <AttachMoneyIcon color="primary" fontSize="small" />
            <Link href="/CategoriesList/" color="inherit">
              Expense
            </Link>
          </Typography>
        </MenuItem>
      </Menu>
    </Typography>
  );
};
export default withStyles(styles)(CategoryMenu);
