const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, '/views'));
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.urlencoded());

//the express routes.
const adminRoutes = require('./routes/admin');
app.use('/', adminRoutes);

// set static directory
app.use(express.static(__dirname + '/public'));

app.listen(8000);
console.log('Server is listening on port 8000');