const express = require('express')
const {MONGOURI} = require('./config/db')
const path = require('path');
const app = express()
const mongoose = require('mongoose')

//Init Middlewares
app.use(express.json({ extended: false }))

mongoose.connect(MONGOURI,{
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser:true,
});
mongoose.connection.on('connected',()=>{
  console.log("connected to mongodb yeah..")
});

mongoose.connection.on('error',(err)=>{
  console.log("error during connection" ,err)
});

// define routes
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/guests', require('./routes/guests'))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started at port ${PORT}`))