const express = require('express')
const app = express() 
const userRoutes = require('./APIs/users');
const incomeRoutes = require('./APIs/income')
const transactionRoutes = require('./APIs/transaction')
app.use(express.json())

require('./config')
require('dotenv').config()

app.use('/users', userRoutes);
app.use('/income', incomeRoutes);
app.use('/transaction', transactionRoutes);

const server =  app.listen(process.env.PORT)
module.exports = {app, server}