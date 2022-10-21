const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Note = require("../modules/Note");

// ROUTE 1 /api/notes/fetchallnotes => get all the notes => login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Interval Server Error!");
    }
});

// ROUTE 2 /api/notes/addnote => add notes => login required.
router.post(
    "/addnote",
    fetchuser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description", "Description must be at least 5 characters").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        //if there are errors, return bad request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, description, tag } = req.body;

            const savedNote = await Note.create({
                title,
                description,
                tag,
                user: req.user.id,
            });

            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Interval Server Error!");
        }
    }
);

// ROUTE 3 /api/notes/updatenote => update notes => login required.

router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //create newNote object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        //find note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        } //note does not exists

        //if another user is trying to modify someone's note then not allowed
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        //by default find&up returns old object but if new is set then it will return object after updating it.
        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );

        //return updated note
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Interval Server Error!");
    }
});

// ROUTE 4 /api/notes/deletenote => delete an existing note=> login required.

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        //find note to be delete
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        } //note does not exists

        //if another user is trying to delete someone's note then not allowed
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        //by default find&up returns old object but if new is set then it will return object after updating it.
        note = await Note.findByIdAndDelete(req.params.id);

        //return deleted note with success
        res.json({ Success: "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Interval Server Error!");
    }
});

module.exports = router;
