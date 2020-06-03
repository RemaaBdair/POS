import React from "react";
import { WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SettingsIcon from "@material-ui/icons/Settings";
import BarChartIcon from "@material-ui/icons/BarChart";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import ReceiptIcon from "@material-ui/icons/Receipt";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LanguageIcon from "@material-ui/icons/Language";
import { withStyles } from "@material-ui/core/styles";
import Logo from "../../images/logo.png";
import IconButton from "@material-ui/core/IconButton";
import PeopleMenu from "./PeopleMenue";
import CategoryMenu from "./CategoryMenu";
import { logOut } from "./util";
import { styles } from "./styles";

const Header: React.FunctionComponent<
  WithStyles<typeof styles> & SvgIconProps
> = (props) => {
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  return (
    <div className={props.classes.root}>
      <AppBar position="fixed" className={props.classes.appBar}>
        <div className={props.classes.logoContainer}>
          <img src={Logo} alt="Logo" className={props.classes.logoImg} />
        </div>
        <Toolbar className={props.classes.toolBar}>
          <Typography className={props.classes.listItem} color="primary">
            <CreditCardIcon color="inherit" fontSize="small" />
            <Link href="#" onClick={preventDefault} color="inherit">
              POS
            </Link>
          </Typography>
          <Typography className={props.classes.listItem} color="primary">
            <StorefrontIcon color="primary" fontSize="small" />
            <Link href="ProductsList" color="inherit">
              Product
            </Link>
          </Typography>

          <PeopleMenu classes={{ listItem: props.classes.listItem }} />

          <Typography className={props.classes.listItem} color="primary">
            <ReceiptIcon color="primary" fontSize="small" />
            <Link href="#" onClick={preventDefault} color="inherit">
              Sales
            </Link>
          </Typography>
          <Typography className={props.classes.listItem} color="primary">
            <AttachMoneyIcon color="primary" fontSize="small" />
            <Link href="#" onClick={preventDefault} color="inherit">
              Expense
            </Link>
          </Typography>
          <CategoryMenu classes={{ listItem: props.classes.listItem }} />
          <Typography className={props.classes.listItem} color="primary">
            <SettingsIcon color="primary" fontSize="small" />
            <Link href="#" onClick={preventDefault} color="inherit">
              Setting
            </Link>
          </Typography>
          <Typography className={props.classes.listItem} color="primary">
            <BarChartIcon color="primary" fontSize="small" />
            <Link href="#" onClick={preventDefault} color="inherit">
              Reports
            </Link>
          </Typography>
        </Toolbar>
        <Toolbar className={props.classes.toolBar}>
          <IconButton
            edge="end"
            aria-label="Log out"
            aria-haspopup="true"
            color="primary"
            onClick={logOut}
          >
            <ExitToAppIcon fontSize="small" />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="primary"
          >
            <LanguageIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default withStyles(styles)(Header);
