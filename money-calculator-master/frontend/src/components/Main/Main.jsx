import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider, Button } from '@material-ui/core';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import InfoCard from '../InfoCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ExpenseTracker = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { logout, currentUser } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const [transactions, Settransactions] = useState([]);
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
      Settransactions(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  fetchData()
  var total = 0;
  const balance = () => {
    transactions.map(transaction => {
      if (transaction.type === "Expense") {
        total = total - transaction.amount;
      }
      else {
        total = total + transaction.amount;
      }
    });
  }
  balance();

  return (
    <>
      <Card className={classes.root}>
        <Button variant="outlined" color='primary' onClick={handleLogout} style={{ margin: "5px" }}>Signout - {currentUser.email}</Button>
        <CardHeader title="Money Tracker" align="center" />
        <CardContent>
          <Typography align="center" variant="h5">Total Balance ${total}</Typography>
          <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px' }}>
            <InfoCard />
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
    </>
  );
};

export default ExpenseTracker;
