import React, { useReducer, createContext } from 'react';
//named imports inside {} and default imports without {}
import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || 
[{ amount: 500, category: 'Salary', type: 'Income', date: '2020-11-16', 
  id: '44c68123-5b86-4cc8-b915-bb9e16cebe6a' }, { amount: 225, category: 'Investments', type: 'Income', 
  date: '2020-11-16', id: '33b295b8-a8cb-49f0-8f0d-bb268686de1a' }, { amount: 50, category: 'Salary', 
  type: 'Income', date: '2020-11-13', id: '270304a8-b11d-4e16-9341-33df641ede64' }, { amount: 123, 
  category: 'Car', type: 'Expense', date: '2020-11-16', id: '0f72e66e-e144-4a72-bbc1-c3c92018635e' }, 
  { amount: 50, category: 'Pets', type: 'Expense', date: '2020-11-13', 
  id: 'c5647dde-d857-463d-8b4e-1c866cc5f83e' }, { amount: 500, category: 'Travel', type: 'Expense', 
  date: '2020-11-13', id: '365a4ebd-9892-4471-ad55-36077e4121a9' }, { amount: 50, category: 'Investments', 
  type: 'Income', date: '2020-11-23', id: '80cf7e33-fc3e-4f9f-a2aa-ecf140711460' }, { amount: 500, 
  category: 'Savings', type: 'Income', date: '2020-11-23', id: 'ef090181-21d1-4568-85c4-5646232085b2' }, 
  { amount: 5, category: 'Savings', type: 'Income', date: '2020-11-23', 
  id: '037a35a3-40ec-4212-abe0-cc485a98aeee' }];

export const ExpenseTrackerContext = createContext(initialState);

/*
    Everything that is wrapped within provider will have access to context. 
*/
export const Provider = ({ children }) => {
     const [transactions, dispatch] = useReducer(contextReducer, initialState);
  
     //Action creators

     /*
      When we hit delete icon, it dispatches deleteTransaction() action which has ‘DELETE_TRANSACTION” type 
      and “ID” of the transaction as payload which is sent to contextReducer where the transaction is removed 
      from the local storage using filter(), which returns all the transactions except the one that needs to 
      be deleted. 
     */
     const deleteTransaction = (id) => {
       dispatch({ type: 'DELETE_TRANSACTION', payload: id });
     };
  
     const addTransaction = (transaction) => {
      dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };
    
   const balance = transactions.reduce((acc, currVal) => 
    (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);
  
    return (
      <ExpenseTrackerContext.Provider value={{
        transactions,
        balance,
        deleteTransaction,
        addTransaction,
      }}>
        {children}
        {/* 
          Everything that is wrapped within provider will be visible here and is going to be wrapped with
          ExpenseTrackerContext and the context values are present inside 'value' prop. now all the things in
          value are accessible in every component of App where context api is called.
         */}
      </ExpenseTrackerContext.Provider>
    );
  };