import React from 'react';
import { Grid } from '@material-ui/core';


import { Details, Main } from './components';
import useStyles from './styles'; //imported as a hook

const App = () => {
  const classes = useStyles(); //call the hooks to use

  /*
    Instead of creating two different Income and Expense components, We have created a single <Details />
    component and called it two times passing Income and Expense as two different props In Details component.
    Which makes code reusable and avoids Code redundancy.
  */
  return (
    <div>
      <Grid className={classes.grid} container spacing={0} alignItems="center" justifyContent="center" 
        style={{ height: '100vh' }}>
        <Grid item xs={12} sm={4} className={classes.mobile}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={3} className={classes.main}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.desktop}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.last}>
          <Details title="Expense" />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;