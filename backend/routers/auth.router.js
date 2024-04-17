const express = require("express");
const User = require("../models/users");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const response = require("../services/response.service");
const secretKet = "DYEvUF9:-II52{f!(K0vkAGhooN1By";
const options = {
  expiresIn: "1h",
};
router.post("/register", async (req, res) => {
  response(res, async () => {
    const user = new User(req.body);
    user._id = uuidv4();
    user.createdDate = new Date();
    user.isAdmin = false;
    const checkUserEmail = await User.findOne({ email: user.email });
    if (checkUserEmail != null) {
      res.status(403).json({ message: "Bu mail adresi daha önce kullanımış!" });
    } else {
      await user.save();
      const token = jwt.sign({}, secretKet, options);
      let model = {
        token: token,
        user: user,
      };
      res.json(model);
    }
  });
});

router.post("/login", async (req, res) => {
  response(res, async () => {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (user == null) {
      res.status(403).json({ message: "Kullanıcı Bulunamadı!" });
    } else {
      if (user.password != password) {
        res.status(403).json({ message: "Şifre Yanlış!" });
      } else {
        const token = jwt.sign({}, secretKet, options);
        let model = {
          token: token,
          user: user,
        };
        res.json(model);
      }
    }
  });
});
module.exports = router;
