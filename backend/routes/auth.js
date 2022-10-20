const express = require("express");
const User = require("../modules/User");
const router = express.Router();
const user = require("../modules/User");
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

//library for security of sensetive data
const bcrypt = require('bcryptjs');
const fetchuser = require("../middleware/fetchuser");

//signature to create auth token -> ideally store it in env or safe
const JWT_SECRET = "dhruvvagadiya"

// ROUTE 1 /api/auth/createuser => to create new user => no login required => POST to secure password 
router.post(
  "/createuser",
  [
    //validations using express validator
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Minimum password length is 9 characters").isLength({
      min: 9,
    }),
  ],

  async (req, res) => {
    //if there are errors, return bad request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Check if user with same email exist already. Await to make JS wait to complete search in databse.
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry, user with this email already exists." });
      }

      //salt is some string that will be added in pw to make it more safe from rainbow tables
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //will create user ans save it in database.
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user : {id: user.id}
      }

      const authtoken = jwt.sign(data, JWT_SECRET);

      //send authtoken to make future authorization easy
      res.json({authtoken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Interval Server Error!");
    }
  }
);


// ROUTE 2 /api/auth/login => authenticate user => no login required => POST to secure password

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists()
  ],

  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error: "Incorrect email/password"});
      }

      const passWordCompare = await bcrypt.compare(password, user.password);
      if(!passWordCompare){
        return res.status(400).json({error: "Incorrect email/password"});
      }

      const data = {
        user : {id: user.id}
      }

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({authtoken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Interval Server Error!");
    }


  })

  // ROUTE 3 /api/auth/getuser => get logged in user details => login required.

  router.post("/getuser", fetchuser, async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Interval Server Error!");
    }
  })



module.exports = router;
