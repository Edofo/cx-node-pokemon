const express = require("express");
const bodyParser = require("body-parser");

const route = require('./routes/index');

const app = express();
const args = process.argv.slice(2);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


app.use("/", route);

app.listen(args[0], function() {
  console.log(
    `Server is listening on http://localhost:${args[0]}`
  );
});