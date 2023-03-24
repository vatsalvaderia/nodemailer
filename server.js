const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server Running post ", PORT));

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', PORT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// middleware
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", //replace with your email provider
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

// verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});


app.post("/contact", function (req, res) {
 let mailOptions = {
   from: process.env.EMAIL,
   to: process.env.EMAIL,
   subject: `Contact Form Details`,
   text: `First Name: ${req.body.mailerState.firstname} ,Last Name: ${req.body.mailerState.lastname}, Email: ${req.body.mailerState.email}, Message: ${req.body.mailerState.message}`,
 };

 transporter.sendMail(mailOptions, function (err, data) {
   if (err) {
     console.log("== Message not Sent ==");
     res.json({
       status: "fail",
     });
   } else {
     console.log("== Message Sent ==");
     res.json({
       status: "success",
     });
   }
 });
});

app.post("/send", function (req, res) {
 let mailOptions = {
   from: process.env.EMAIL,
   to: process.env.EMAIL,
   subject: `Inquiry Form Details`,
   text: `First Name: ${req.body.mailerState.firstname} ,Last Name: ${req.body.mailerState.lastname}, Email: ${req.body.mailerState.email}, Phone: ${req.body.mailerState.phone}, Message: ${req.body.mailerState.message}`,
 };

 transporter.sendMail(mailOptions, function (err, data) {
   if (err) {
     console.log("== Message not Sent ==");
     res.json({
       status: "fail",
     });
   } else {
     console.log("== Message Sent ==");
     res.json({
       status: "success",
     });
   }
 });
});