const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const cookieParser = require("cookie-parser");

// Init application
const app = express();
app.use(cookieParser()); //cookie-parser dùng để đọc cookies của request:
app.use(
  cors({
    origin: "http://localhost:3000", //Chan tat ca cac domain khac ngoai domain nay
    credentials: true, //Để bật cookie HTTP qua CORS
  })
);

// Config view engine
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const tagsRoute = require('./app/tags/tags.routes')
const usersRoute = require('./app/users/users.routes')
const questionsRoute = require('./app/questions/questions.routes')
app.use('/api/tags', tagsRoute)
app.use('/api/users', usersRoute)
app.use('/api/questions', questionsRoute)


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Eduhub listening on port http://localhost:${port}`);
});
