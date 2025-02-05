import React, { useState, useContext, useEffect } from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import useStyles from './styles';
import { ExpenseTrackerContext } from '../../../context/context';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import formatDate from '../../../utils/formatDate';
import Snackbar from '../../Snackbar/Snackbar';

const initialState = {
  amount: '',
  category: '',
  type: 'Income',
  date: formatDate(new Date()),
};

const Form = () => {
  const classes = useStyles();
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);

  const createTransaction = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;
    setOpen(true);
    addTransaction({ ...formData, amount: Number(formData.amount), id: uuidv4() });
    setFormData(initialState);
  };

  const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
     <Snackbar open={open} setOpen={setOpen} /> 
    <Grid item xs={6}>
      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>
        <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={6}>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
             {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)} 
         <MenuItem value="buisiness">Buisiness</MenuItem>
          <MenuItem value="salary">Salary</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={6}>
      <TextField type="number" label="Amount" value={formData.amount} 
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })} fullWidth />
    </Grid>
    <Grid item xs={6}>
      <TextField fullWidth label="Date" type="date" value={formData.date} 
        onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value)})} />
    </Grid>
    <Button className={classes.button} variant="outlined" color="primary" fullWidth 
      onClick={createTransaction} >Create</Button>
  </Grid>
  )
}

export default Form