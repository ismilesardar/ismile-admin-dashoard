/**
 * Date: 09/07/2023
 * Subject: E-comers Project server auth.js
 * Auth: Ismile Sardar
 */

//third-parity module require
const express = require("express");
const authCont = require("../controllers/auth");
const router = express.Router();

//test router
router.get("/", (req, res) => {
  res.status(200).send("This is testing Route");
});

//register Router
router.post("/register", authCont.register);
router.post("/login", authCont.login);

//module exports
module.exports = router;
