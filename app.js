const express = require("express");
const PORT = process.env.PORT || 3000;
const ejs = require("ejs");
const path = require("path");
const morgan = require("morgan");
const fs = require("fs");
const { check, validationResult } = require("express-validator");
const EmployeeRoute = require("./router/employeeRoutes");
const HomeRoute = require("./router/homeRoutes");
const loginRoute = require("./router/loginRoutes");
const departmentRoute = require("./router/departmentRouter");
const leaverRouter = require("./router/leaveRouter");
const userRouter = require("./router/UserRoutes");
const leaveRequst = require("./router/leaveRequestRoutes");
const url = "mongodb://localhost:27017/OderaDB";

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const bodyParser = require("body-parser");

const app = express();
const mongoose = require("mongoose");
const { append } = require("express/lib/response");
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Database is Connected");
});
// Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));
app.use(cookieParser("SecretStringForCookies"));
app.use(
  session({
    secret: "SecretStringForSession",
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(flash());
//Custom Middleware

// App Routes
app.use("/", loginRoute);
app.use("/home", HomeRoute); // Admin Role
app.use("/employee", EmployeeRoute); // Employee Role
app.use("/department", departmentRoute);
app.use("/allLeave", leaveRequst);
app.use("/leave", leaverRouter);
app.use("/user", userRouter); // Employee Role
app.get("*", (req, res) => {
  res.status(404).render("404", { errorMessage: "404 - PAGE NOT FOUND" });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is Listening on Port ${PORT}`);
});
