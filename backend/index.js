const express = require('express')
const app = express() 
const userRoutes = require('./APIs/users');
const incomeRoutes = require('./APIs/income')
app.use(express.json())

require('./config')
require('dotenv').config()

app.use('/users', userRoutes);
app.use('/income', incomeRoutes);

const server =  app.listen(process.env.PORT)
module.exports = {app, server}