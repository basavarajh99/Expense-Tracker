import React, {useContext} from "react";
import { Card, CardHeader, CardContent, Typography, Grid, Divider,} from "@material-ui/core";
import { ExpenseTrackerContext } from "../../context/context";
import useStyles from "./styles";
import Form from "./Form/Form";
import List from "./List/List";

const ExpenseTracker = () => {
  const classes = useStyles();
  const { balance } = useContext(ExpenseTrackerContext);

  return (
    <Card className={classes.root}>
      <CardHeader title="Expense Tracker" align="center" />
      <CardContent>
        <Typography align="center" variant="h5">
          Total Balance ${balance}
        </Typography>
        <Divider className={classes.divider} />
        <Form />
      </CardContent>
      <CardContent className={classes.cartContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ExpenseTracker;
