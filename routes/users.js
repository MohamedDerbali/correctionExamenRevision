var express = require("express");
var router = express.Router();
const userModels = require("../models/user");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const users = await userModels.find();
  res.render("index", { users: users });
});
router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await userModels.findOne({ username, password });
    if (!user) {
      throw new Error("User not found");
    }
    res.redirect("/users");
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
router.post("/addUser", async function (req, res, next) {
  try {
    const { username, email } = req.body;
    const checkIfUserExists = await userModels.findOne({ email });
    if (checkIfUserExists) {
      throw new Error("User already exists");
    }
    const user = new userModels({
      username: username,
      email: email,
    });
    await user.save();
    res.redirect("/users");
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
router.get("/search", async function (req, res, next) {
  res.render("search");
});
router.post("/search", async function (req, res, next) {
  try{
    const {search} = req.body;
    const user = await userModels.findOne({email: search});
    if(!user){
      throw new Error("User not found");
    }
    res.redirect(`/users/gestionUser/${user._id}`);
  }catch(err){
    res.status(500).json({
      message: err.message,
    });
  }
});
router.get("/gestionUser/:id" , async function (req, res, next) {
  const {id} = req.params;
  const user = await userModels.find({_id: id});//[]
  console.log(user)
  //findOne -> {}
  res.render("gestionUser", {users: user});
});
router.get("/delete/:id", async function (req, res, next) {
  const {id} = req.params;
  await userModels.deleteOne({_id: id});
  res.redirect("/users");
});
module.exports = router;
