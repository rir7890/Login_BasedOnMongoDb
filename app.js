const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const LoginModel = require("./model/loginUser");
// const helmet = require("helmet");
// const { rename } = require("fs");
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("it running on the port");
});

app.get("/", (req, res) => {
  let user = req.cookies.username;
  return res.render("home", { user });
});

app.get("/welcome", (req, res) => {
  let user = req.cookies.user;
  return res.render("welcome", { user });
});

app.get("/login", (req, res) => {
  let bad_auth = req.query.msg ? true : false;
  if (bad_auth) {
    console.log("error");
    return res.render("login", {
      error: "user is invalid",
    });
  } else {
    return res.render("login", {});
  }
});

app.post("/process_login", async function (req, res) {
  let user = req.body.username;
  let psword = req.body.password;
  // console.log(user);
  let userdeatils = await LoginModel.findOne({
    username: user,
  });
  // console.log(userdeatils[0].username);
  // console.log(userdeatils);
  if (userdeatils) {
    if (user == userdeatils.username && psword == userdeatils.password) {
      res.cookie("username", user, {
        httpOnly: true,
        secure: true,
      });
      return res.render("welcome", { user });
    } else {
      return res.redirect("/login?msg=fail");
    }
  } else {
    return res.json({
      message: "wrong user name and password",
    });
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("user");
  return res.render("login", {});
});

//////----------------------------------------------------//////

// app.get("/", (req, res) => {
//   return res.redirect("/welcome");
// });

// app.get("/welcome", (req, res) => {
//   // res.send("<h1>hello world</h1> <a href='/login'>Login</a> ");
//   let username = "rahul";
//   res.render("welcome", { username });
// });

// app.get("/login", (req, res) => {
//   res.render("login");
// });
