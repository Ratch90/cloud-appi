const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/users');

const app = express();

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());


app.use('/',userRoutes);

const CONNECTION_URL = 'mongodb+srv://rasciel:racho901005@cluster0.mshld.mongodb.net/Users?retryWrites=true&w=majority'
const PORT = process.env.PORT || 8080;

//CONNECT TO DB
mongoose.connect(CONNECTION_URL,{ useNewUrlParser : true, useUnifiedTopology: true })
    .then(() => app.listen(PORT,() => console.log(`Server running on port : ${PORT}`)))
    .catch((error) => console.log(error.message) );


mongoose.set('useFindAndModify',true);
    
