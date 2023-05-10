import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { incomeCategories, expenseCategories, resetCategories } from './constants/categories';

const useTransactions = (title) => {
  resetCategories();
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/gettransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: currentUser.email
        })
      });
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  fetchData()
  const rightTransactions = transactions.filter((t) => t.type === title);
  const total = rightTransactions.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  const categories = title === 'Income' ? incomeCategories : expenseCategories;

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
