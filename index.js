const express = require('express');
const app = express();
var bodyParser = require('body-parser')

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ // alternative
    extended: true
}));

// routes
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

// set static directory
app.use(express.static(__dirname + '/public'));

app.listen(8000);
console.log('Server is listening on port 8000');