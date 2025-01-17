
import React, { useContext } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, 
  Slide } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';
import { ExpenseTrackerContext } from '../../../context/context';
import useStyles from './styles';

const List = () => {
    const classes = useStyles();
    const {transactions, deleteTransaction } = useContext(ExpenseTrackerContext);
    
    // const transactions = [
    //     {id: 1, type: "Income", category: "Salary", amount: 50, date:"Mon Jul 18 2022"},
    //     {id: 2, type: "Expense", category: "Pets", amount: 50, date:"Mon Jul 19 2022"},
    //     {id: 3, type: "Income", category: "Salary", amount: 50, date:"Mon Jul 18 2022"},
    //     {id: 4, type: "Income", category: "Salary", amount: 50, date:"Mon Jul 18 2022"}
    // ];
  return (
    <MUIList dense={false} className={classes.list}>
      {transactions.map((transaction) => (
        <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                <MoneyOff />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={transaction.category} 
              secondary={`$${transaction.amount} - ${transaction.date}`} />
              {/* Putting ${} inside template string `` allows dynamic content */}
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => deleteTransaction(transaction.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))}
    </MUIList>
  )
}

export default List