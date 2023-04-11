const express = require('express')
const app = express() 
const userRoutes = require('./APIs/users');
app.use(express.json())

require('./config')
require('dotenv').config()

app.use('/users', userRoutes);

const server =  app.listen(process.env.PORT)
module.exports = {app, server}