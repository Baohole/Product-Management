const express = require('express');
const app = express();

var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session')
var cookieParser = require('cookie-parser')
require('dotenv').config();

const port = process.env.PORT ;

const cRouter = require('./routers/client/index.router'); //client router
const aRouter = require('./routers/admin/index.router'); //admin router

const database = require('./config/database');

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser('612Gasd0q)'));
app.use(session({ cookie: { maxAge: 6000 }}));
app.use(flash());

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

const sysConfig = require('./config/system');

app.locals.prefixAdmin = sysConfig.prefixAdmin;
//console.log(app.locals);

//Routers
cRouter(app);
aRouter(app);

database.connect();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});