/**
 * 300337817 Oprah Huang
 * CSIS 3380 Assignment 1 BMI Calculator
 */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// middleware for parsing body from URL
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// GET method route
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/bmi.html");
});

// POST method route
app.post("/", function (req, res) {
  console.log(req.body);

  const age = req.body.age;
  const height = req.body.height;
  const weight = req.body.weight;
  // calcultor the result of BMI
  let calBMI = (weight / ((height * height) / 10000)).toFixed(1);

  // print the html and send the result if the input are not empty
  if (height === "") {
    console.log("Please enter a valid height number");
  } else if (weight === "") {
    console.log("Please ente r a valid weight number");
  } else if (age === "") {
    console.log("Please enter your age");
  } else {
    console.log("You Worked successfully");
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <link type="text/css" rel="stylesheet" href="bmi.css">
      <link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>BMI checker</title>
    </head>
    <div class="header">
      <div class="wrapper">
        <form action="/" method="POST">
          <h1>BMI calculator</h1>
          <p>Insert Your Age</p>
          <input type="text" id="age" name="age">
          <p>Insert Weight in Kg</p>
          <input type="text" id="weight" name="weight">
          <br>
          <p>Insert Height in cm</p>
          <input type="text" id="height" name="height">
          <br>
          <button id="calc">check</button>
          <p id="result">Your BMI result is ${calBMI}</p>
        </form>
      </div>
    </div>
    <script src="calculator.js"></script>
    </body>
    </html>
  `);
  }
});

// insert the css file in the html
app.use(express.static(path.join(__dirname, "css")));

// run the port 3000 and listen the port
app.listen(3000, function () {
  console.log("Server running on 3000");
});
