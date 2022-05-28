const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');

const port=8000;

//including the mongoose file before firing up the server
const db=require('./config/mongoose.js');

const Contact=require('./models/contact.js');

// firing up the express package and storing all of its functionalities in the variable app
const app=express();

var contactList=[
    {
        name : 'Abhi',
        phone : '1234567890'
    },
    {
        name : 'Tony Stark',
        phone: '0987654321'
    },
    {
        name : 'Coding Ninjas',
        phone : '3456127890'
    }
];

//since app is an object, we are setting key-value pairs in that object
app.set('view engine', 'ejs');              //telling express that we'll be using ejs as our view engine
app.set('views', path.join(__dirname, 'views'));        //setting the path of view files

//using the middleware
app.use(bodyParser.urlencoded({extended:false}));       //parsing the data coming from the form
app.use(express.static('assets'));                  //setting the path for static files

/*// Middleware 1
app.use(function(req, res, next){
    console.log('Middleware 1 called!');
    next();
});

// Middleware 2
app.use(function(req, res, next){
    console.log('Middleware 2 called!');
    next();
});
*/

app.get('/', function(req, res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching the contacts from the db');
            return;
        }

        return res.render('home', {
            title: 'Contacts List',
            contact_list: contacts
        });
    })
});

app.get('/practice', function(req, res){
    return res.render('practice', {title : 'Playing with ejs'});
});

//handling the post request from the submitted form
app.post('/create-contact', function(req, res){
    // contactList.push(req.body);
    // return res.redirect('back');

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('Error in creating a contact');
            return;
        }

        console.log('**********', newContact);
        return res.redirect('back');
    });
});

//handling the get request for deleting a contact
app.get('/delete-contact', function(req, res){
    let id=req.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting a contact from the db');
            return;
        }

        res.redirect('back');
    });
});

//running our express server
app.listen(8000, function(err){
    if(err){
        console.log('Error in running the Server ', err);
        return;
    }

    console.log('Server is up and running at port ', port);
});