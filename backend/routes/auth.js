const express = require('express');
const User = require('../modules/User');
const router = express.Router();
const user = require('../modules/User');
const { body, validationResult } = require('express-validator');


router.post('/', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Minimum password length is 9 characters').isLength({ min: 9 }),
], (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      }).then(user => res.json(user))
      .catch(err=> {console.log(err)
        res.json({error : 'Email is already registered.',
        messege: err.message
        })
    });

})


module.exports = router;