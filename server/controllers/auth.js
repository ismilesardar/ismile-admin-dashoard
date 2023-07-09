/**
 * Date: 09/07/2023
 * Subject: E-comers Project controllers
 * Auth: Ismile Sardar
 */

//packeg Required
const jwt = require("jsonwebtoken");
const Users = require("../models/auth.js");
const { comparePassword } = require("../helper/auth.js");

//module scaffolded
const authCont = {};
//register Controller
authCont.register = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { name, phone, password } = req.body;
    const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/i;
    // 2. all fields require validation
    if (!name.trim()) {
      return res.status(404).json({ error: "Name is Required!" });
    }
    if (!phone.trim() || !phoneRegex.test(phone)) {
      return res.status(404).json({ error: "BD Phone number is Required!" });
    }
    if (!password.trim() || password.length < 6) {
      return res
        .status(404)
        .json({ error: "Password must be at least 6 characters long!" });
    }

    // 3. check if email is taken
    const existingUser = await Users.findOne({ phone });
    if (existingUser) {
      return res.status(404).json({ error: "phone number is already taken!" });
    }
    // 5. register customer
    const newUser = await new Users({
      name,
      phone,
      password,
    }).save();

    // 7. send response
    res.status(201).json({status: true});
  } catch (error) {
    console.log(error);
  }
};

//login controller
authCont.login = async (req, res) => {
  try {
    // 1. destructure phon, password from req.body
    const { phone, password } = req.body;
    // console.log(req.body)
    // console.log(phone,"and",password)
    // 2. all fields require validation
    if (!phone.trim()) {
      return res.status(404).json({ error: "phone is Required!" });
    }
    if (!password.trim() || password.length < 6) {
      return res
        .status(404)
        .json({ error: "Password must be at least 6 characters long!" });
    }
    // 3. check if user is exist
    const existingUser = await Users.findOne({ phone });
    if (!existingUser) {
      return res.status(404).json({ error: "Data not found!" });
    }
    // 4. compare password
    const match = comparePassword(password, existingUser.password);
    if (!match) {
      return res.status(404).json({ error: "Incorrect password!" });
    }
    // 5. create signed jwt
    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    // 7. send response
    res.status(201).json({
      user: {
        name: existingUser.name,
        phone: existingUser.phone,
        role: existingUser.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

//module exports
module.exports = authCont;