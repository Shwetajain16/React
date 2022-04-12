//insert our package
require('./models/db');
//make object of our dwld package
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
//object of our empcontroller
const employeeController = require('./controllers/employeeController');
//take object of app from epress
var app = express();
//use:for use of package
//bodyparser:uncode our url
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');
//port number
app.listen(4000, () => {
    console.log('Express server started at port : 4000');
});
//name of our empcontroller
app.use('/employee', employeeController);