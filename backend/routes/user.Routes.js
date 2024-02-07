const express = require("express");
const userRouter = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { userModel } = require("../model/user.Model");

userRouter.post("/signup", async (req, res) => {
   try {
      const { username, password, role } = req.body;

      // Check for missing fields
      const missingFields = [];
      if (!username) missingFields.push("username");
      if (!password) missingFields.push("password");

      // If any fields are missing, return an error

      if (missingFields.length > 0) {
         return res.status(400).json({
            msg: `Please fill in the following fields: ${missingFields.join(
               ","
            )}`,
         });
      }
      const existinguser = await userModel.findOne({ username });

      if (existinguser) {
         return res
            .status(201)
            .json({ msg: "User has already registered,please login" });
      }

      bcrypt.hash(password, 5, async (err, hash) => {
         if (err) {
            return res.status(400).json({ msg: err.message });
         } else {
            const newuser = new userModel({
               username,
               password: hash,
               role,
            });
            await newuser.save();
            return res
               .status(200)
               .json({ msg: "Registered successfully", user: newuser });
         }
      });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

userRouter.post("/login", async (req, res) => {
   const { username, password } = req.body;

   const missingFields = [];
   if (!username) missingFields.push("username");
   if (!password) missingFields.push("password");

   // If any fields are missing, return an error
   if (missingFields.length > 0) {
      return res.status(200).json({
         msg: `Please fill in the following fields: ${missingFields.join(",")}`,
      });
   }
   try {
      const existinguser = await userModel.findOne({ username });
      if (!existinguser) {
         return res
            .status(404)
            .json({ msg: "User not found,please create account" });
      }
      bcrypt.compare(password, existinguser.password, async (err, result) => {
         if (result) {
            const token = jwt.sign(
               {
                  userID: existinguser._id,
                  username: existinguser.name,
                  // roles: existinguser.roles,
               },
               process.env.SECREAT_KEY
            );
            return res.status(200).json({
               msg: "Login successfully",
               token: token,
               role: existinguser.role,
               id: existinguser._id,
               username: existinguser.username,
            });
         } else {
            return res.status(400).json({ msg: "Wrong credential" });
         }
      });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

module.exports = { userRouter };
