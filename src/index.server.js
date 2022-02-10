const express = require('express');
const env= require('dotenv');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./routes/auth'); 
const  adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
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
app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api', authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.listen(process.env.PORT,() => {
    console.log(`server is running on port ${process.env.PORT} `);
});