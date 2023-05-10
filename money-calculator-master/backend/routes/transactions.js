const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/addtransaction', async (req, res) => {
    try {
        //creates new user
        const usertransaction = await User.create({
            email: req.body.email,
            amount: req.body.amount,
            category: req.body.category,
            type: req.body.type,
            date: req.body.date
        })
        res.json(usertransaction);
    }
    //catches error
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})
router.post('/gettransaction', async (req, res) => {
    try {
        const user_email = req.body.email;
        const user = await User.find({ email: user_email });
        res.send(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})
router.post('/deletetransaction', async (req, res) => {
    try {
        const user_id = req.body.id;
        const user = await User.findOneAndDelete({ _id: user_id });
        res.send(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;