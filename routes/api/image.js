const express = require('express');
const router = express.Router();

const User = require('../../models/User');


// @route  GET api/posts
// @desc   Get all posts
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
