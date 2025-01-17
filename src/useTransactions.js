import { useContext } from 'react';
import { ExpenseTrackerContext } from './context/context';

import { incomeCategories, expenseCategories, resetCategories } from './constants/categories';

  /*
    This custom hook (It's an arrow function that starts with 'use' and uses some of the react features like
    useContext or something similar to that) handles all the logic of adding a transaction and calculating the
    sum and removing the transactions etc...

    It will take only 'title' as a prop to know whether we are on income/expense category. The flow goes as
    follow:
    first we reset the each specific categories to 0 before adding any transaction. Then we will fetch all the 
    transactions from global context. Based on title we filter out only specific type i.e, income or expense. 
    then we will form 'total' based on the filtered transactions from a specific category using 'reduce()'
    reduce function traverses an array of values and performs specific operation like sum and stores it inside
    parameter called as 'accumulator' as a single value. we can also do this using 'for loops' and taking a 
    seperate variable to add the val of array.
    
    Now to find 'amount' inside each category of income/expense type. We will run a for-each loop on all the
    transactions obtained from global context and based on it's type and category we will add the amount inside 
    transaction to the amount of that category of income/expense type. Once the amount of a specific category
    becomes 0 we will not show it on chart.  
  */

const useTransactions = (title) => {
  resetCategories();
  const { transactions } = useContext(ExpenseTrackerContext);
  const rightTransactions = transactions.filter((t) => t.type === title);
  const total = rightTransactions.reduce((acc, currVal) => acc += currVal.amount, 0);
  const categories = title === 'Income' ? incomeCategories : expenseCategories;

    // console.log({ rightTransactions, total, categories });
    
  rightTransactions.forEach((t) => {
    const category = categories.find((c) => c.type === t.category);

    if (category) category.amount += t.amount;
  });

  const filteredCategories = categories.filter((sc) => sc.amount > 0);

  const chartData = {
    datasets: [{
      data: filteredCategories.map((c) => c.amount),
      backgroundColor: filteredCategories.map((c) => c.color),
    }],
    labels: filteredCategories.map((c) => c.type),
  };

  return { filteredCategories, total, chartData };
};

export default useTransactions;