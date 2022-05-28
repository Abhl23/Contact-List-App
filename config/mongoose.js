//require the library
const mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost:27017/contacts_list_db');

//acquire the connection (to check if it is successful)
const db=mongoose.connection;

//error handling
db.on('error', console.error.bind(console, 'Error connecting to database: '));

//if up and running print the message
db.once('open', function(){
    console.log('Successfully connected to the database');
});