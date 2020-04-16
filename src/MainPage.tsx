import React, { useState } from "react";
import { createMuiTheme, WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SettingsIcon from "@material-ui/icons/Settings";
import BarChartIcon from "@material-ui/icons/BarChart";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import ReceiptIcon from "@material-ui/icons/Receipt";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LanguageIcon from "@material-ui/icons/Language";
import {
  withStyles,
  createStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Logo from "./logo.png";
import Link from "@material-ui/core/Link";
import { RouteComponentProps } from "@reach/router";
import IconButton from "@material-ui/core/IconButton";
import Background from "./bg.png";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#777",
    },
  },
  overrides: {
    MuiTypography: {
      root: {
        margin: 5,
        display: "flex",
        alignItems: "center",
      },
    },
  },
});

const styles = createStyles({
  "@global": {
    body: {
      fontFamily: "lato",
      backgroundColor: "white",
      backgroundImage: `url(${Background})`,
      height: "100%",
    },
  },
  root: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  toolBar: { justifyContent: "center" },
  logoImg: {
    height: 35,
    width: 135,
  },
  logoContainer: {
    alignSelf: "center",
  },
  appBar: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
const HigherOrderComponent = (
  props: WithStyles<typeof styles> & RouteComponentProps & SvgIconProps
) => {
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();
  const [anchorPeople, setAnchorPeople] = useState<null | HTMLElement>(null);
  const [anchorCategories, setAnchorCategories] = useState<null | HTMLElement>(
    null
  );
  const handlePeopleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorPeople(event.currentTarget);
  };
  const handlePeopleClose = () => {
    setAnchorPeople(null);
  };
  const handleCategoriesClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorCategories(event.currentTarget);
  };

  const handleCategoriesClose = () => {
    setAnchorCategories(null);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className={props.classes.root}>
        <AppBar position="fixed" className={props.classes.appBar}>
          <div className={props.classes.logoContainer}>
            <img src={Logo} alt="Logo" className={props.classes.logoImg} />
          </div>
          <Toolbar className={props.classes.toolBar}>
            <Typography color="primary">
              <CreditCardIcon color="inherit" fontSize="small" />
              <Link href="#" onClick={preventDefault} color="inherit">
                POS
              </Link>
            </Typography>
            <Typography color="primary">
              <StorefrontIcon color="primary" fontSize="small" />
              <Link href="#" onClick={preventDefault} color="inherit">
                Product
              </Link>
            </Typography>
            <Typography color="primary">
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
                  <Typography color="primary">
                    <PersonIcon color="primary" fontSize="small" />
                    <Link href="#" onClick={preventDefault} color="inherit">
                      Customers
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handlePeopleClose}>
                  <Typography color="primary">
                    <LocalShippingIcon color="primary" fontSize="small" />
                    <Link href="#" onClick={preventDefault} color="inherit">
                      Suppliers
                    </Link>
                  </Typography>
                </MenuItem>
              </Menu>
            </Typography>
            <Typography color="primary">
              <ReceiptIcon color="primary" fontSize="small" />
              <Link href="#" onClick={preventDefault} color="inherit">
                Sales
              </Link>
            </Typography>
            <Typography color="primary">
              <AttachMoneyIcon color="primary" fontSize="small" />
              <Link href="#" onClick={preventDefault} color="inherit">
                Expense
              </Link>
            </Typography>
            <Typography color="primary">
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
                  <Typography color="primary">
                    <ReceiptIcon color="primary" fontSize="small" />
                    <Link href="#" onClick={preventDefault} color="inherit">
                      Sales
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCategoriesClose}>
                  <Typography color="primary">
                    <AttachMoneyIcon color="primary" fontSize="small" />
                    <Link href="#" onClick={preventDefault} color="inherit">
                      Expense
                    </Link>
                  </Typography>
                </MenuItem>
              </Menu>
            </Typography>
            <Typography color="primary">
              <SettingsIcon color="primary" fontSize="small" />
              <Link href="#" onClick={preventDefault} color="inherit">
                Setting
              </Link>
            </Typography>
            <Typography color="primary">
              <BarChartIcon color="primary" fontSize="small" />
              <Link href="#" onClick={preventDefault} color="inherit">
                Reports
              </Link>
            </Typography>
          </Toolbar>
          <Toolbar className={props.classes.toolBar}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="primary"
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
    </ThemeProvider>
  );
};
const MainPage = withStyles(styles)(HigherOrderComponent);

export default MainPage;
