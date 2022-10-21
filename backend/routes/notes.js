const express = require('express');
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Note = require("../modules/Note");

// ROUTE 1 /api/notes/fetchallnotes => get all the notes => login required.
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Interval Server Error!");
    }
})

// ROUTE 2 /api/notes/addnote => add notes => login required.
router.post('/addnote', fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({min: 5,}),
], async (req, res)=>{

    //if there are errors, return bad request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {title, description, tag} = req.body;

        const savedNote = await Note.create({
            title, description, tag, user: req.user.id
          });

        res.json(savedNote);
         
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Interval Server Error!");
    }
})


module.exports = router;