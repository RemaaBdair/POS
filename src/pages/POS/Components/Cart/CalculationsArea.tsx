import React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { State } from "../../../../store/state";
import { connect, ConnectedProps } from "react-redux";
import { styles } from "./styles";
import { selectSubTotal } from "../../../../selectors";
type PropsFromRedux = ConnectedProps<typeof connector>;

const CalculationsArea: React.FunctionComponent<
  WithStyles<typeof styles> & PropsFromRedux
> = (props) => {
  const { classes, subTotal } = props;
  const [tax, setTax] = React.useState(17);
  const [discount, setDiscount] = React.useState(0);
  const handleTaxChange = (tax: number) => {
    if (tax >= 0) setTax(tax);
  };
  const handleDiscountChange = (discount: number) => {
    if (discount >= 0) setDiscount(discount);
  };
  const total = React.useMemo(
    () => subTotal + (subTotal * tax) / 100.0 - (subTotal * discount) / 100.0,
    [subTotal, tax, discount]
  );

  return (
    <Grid item container classes={{ root: classes.calculationsArea }}>
      <Grid
        item
        xs={6}
        className={`${classes.calculationItem} ${classes.leftEdgeItem} `}
      >
        <Typography>Sub Total</Typography>
      </Grid>
      <Grid item xs={6} className={`${classes.calculationItem}  `}>
        <Typography>{subTotal} </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        className={`${classes.calculationItem} ${classes.leftEdgeItem}`}
      >
        <Typography>Order Tax</Typography>
      </Grid>
      <Grid item xs={6} className={`${classes.calculationItem} `}>
        <Typography>
          <TextField
            type="text"
            value={tax}
            variant="outlined"
            fullWidth={true}
            classes={{ root: classes.textField }}
            onChange={(event) => handleTaxChange(+event.target.value)}
          />
        </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        className={`${classes.calculationItem} ${classes.leftEdgeItem} `}
      >
        <Typography>Discount</Typography>
      </Grid>
      <Grid item xs={6} className={`${classes.calculationItem} `}>
        <Typography>
          <TextField
            type="text"
            value={discount}
            variant="outlined"
            fullWidth={true}
            classes={{ root: classes.textField }}
            onChange={(event) => handleDiscountChange(+event.target.value)}
          />
        </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        className={`${classes.calculationItem} ${classes.leftEdgeItem} ${classes.bottomEdgeItem} `}
      >
        <Typography>Total</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        className={`${classes.calculationItem} ${classes.bottomEdgeItem}`}
      >
        {total}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: State) => ({
  subTotal: selectSubTotal(state),
});

const connector = connect(mapStateToProps);
const WrappedComponent = connector(CalculationsArea);
export default withStyles(styles)(WrappedComponent);
