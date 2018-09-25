require('dotenv').config();

const express = require('express'),
{ json } = require('body-parser'),
session = require('express-session'),
checkForSession = require('./middlewares/checkForSession'),
{ read } = require('./controllers/swag_controller'),
{ login, register, signout, getUser } = require('./controllers/auth_controller'),
{ add, checkout, remove } = require('./controllers/cart_controller'),
{ search } = require('./controllers/search_controller');

const app = express();

app.use(json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

//swag controller
app.get('/api/swag', read);

//auth controller
app.get('/api/user', getUser);
app.post('/api/login', login);
app.post('/api/register', register);
app.post('/api/signout', signout);

//cart controller
app.post('/api/cart', add);
app.post('/api/cart/checkout', checkout);
app.delete('/api/cart', remove);

//search controller
app.get('/api/search', search);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`))