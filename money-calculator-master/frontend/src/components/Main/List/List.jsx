import React, { useState } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';
import useStyles from './styles';
import { useAuth } from '../../../context/AuthContext';

const List = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
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

  const deletetransaction = (id) => {
    fetch('http://localhost:5000/api/deletetransaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
  }

  return (
    <MUIList dense={false} className={classes.list}>
      {transactions.map((transaction) => (
        <Slide direction="down" in mountOnEnter unmountOnExit key={transaction._id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                <MoneyOff />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => deletetransaction(transaction._id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))
      }
    </MUIList >
  );
};

export default List;
