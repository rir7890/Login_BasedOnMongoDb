const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/LoginUserData";

mongoose
  .connect(url)
  .then((db) => console.log("it is connected"))
  .catch((err) => console.log(err));

const LoginSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const LoginModel = mongoose.model("LoginModel", LoginSchema);

// (async function createUser() {
//   let dataObj = {
//     username: "rohit",
//     password: "abcdefghi",
//   };
//   let data = await LoginModel.create(dataObj);
//   console.log(data);
// })();

module.exports = LoginModel;
