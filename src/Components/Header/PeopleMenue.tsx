import React, { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PeopleIcon from "@material-ui/icons/People";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";
import { styles } from "./styles";
const PeopleMenu: React.FunctionComponent<WithStyles<typeof styles>> = (
  props
) => {
  const [anchorPeople, setAnchorPeople] = useState<null | HTMLElement>(null);
  const handlePeopleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorPeople(event.currentTarget);
  };
  const handlePeopleClose = () => {
    setAnchorPeople(null);
  };
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();
  return (
    <Typography className={props.classes.listItem} color="primary">
      <PeopleIcon color="primary" fontSize="small" />
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="primary"
        onClick={handlePeopleClick}
      >
        People
      </Button>

      <Menu
        id="category-menu"
        anchorEl={anchorPeople}
        keepMounted
        open={Boolean(anchorPeople)}
        onClose={handlePeopleClose}
      >
        <MenuItem onClick={handlePeopleClose}>
          <Typography className={props.classes.listItem} color="primary">
            <PersonIcon color="primary" fontSize="small" />
            <Link href="#" onClick={preventDefault} color="inherit">
              Customers
            </Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handlePeopleClose}>
          <Typography className={props.classes.listItem} color="primary">
            <LocalShippingIcon color="primary" fontSize="small" />
            <Link href="#" onClick={preventDefault} color="inherit">
              Suppliers
            </Link>
          </Typography>
        </MenuItem>
      </Menu>
    </Typography>
  );
};
export default withStyles(styles)(PeopleMenu);
