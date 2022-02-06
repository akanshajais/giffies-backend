const express = require('express');
const env= require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user'); 

env.config();
//mongodb+srv://JaiswalAkansha:<password>@cluster0.db7af.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const URL = `mongodb+srv://${username}:${password}@giffies.306mx.mongodb.net/GIFFIES?retryWrites=true&w=majority`;
const Connection = async(username,password) =>{
    try{
        await mongoose.connect(URL,
            {
                useNewUrlParser:true, 
                useUnifiedTopology:true,
               
            });
        console.log('database connected');
    }catch(error)
    {
        console.log('ERROR: ',error.message);
    }
}

Connection(username,password);

app.use(express.json());
app.use('/api', userRoutes);

app.listen(process.env.PORT,() => {
    console.log(`server is running on port ${process.env.PORT} `);
});