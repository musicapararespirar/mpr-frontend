const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Concert = require('../../models/Concert');
// const Profile = require('../../models/Profile');
// const User = require('../../models/User');


// @route  POST api/concert
// @desc   Request a concert
// @access Public
router.post(
    '/', [
        check('dateFor').isISO8601().toDate()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ input: req.body , errors: errors.array() });
        }

        try {
            const newConcert = new Concert({
                requesterName: req.body.requesterName,
                requestType: req.body.requestType,
                preferredMusician: req.body.preferredMusician,
                preferredMusicianName: req.body.preferredMusicianName,
                listenerMessage: req.body.listenerMessage,
                listenerName: req.body.listenerName,
                listenerLocation: req.body.listenerLocation,
                listenerNumber: req.body.listenerNumber,
                listenerTimezone: req.body.listenerTimezone,
                asap: req.body.asap,
                dateFor: req.body.dateFor,
            })

            const concert = await newConcert.save();

            res.json(concert); // Once get post, add it to the response
        } catch(err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }

    });

// @route  GET api/concert
// @desc   Get all concerts
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const concerts = await Concert.find().sort({ dateFor: -1 });
        res.json(concerts);

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


// @route  GET api/concert/:id
// @desc   Get concert by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if(!concert) {
            return res.status(404).json({ msg: "Concert not found" });
        }
        res.json(concert);
    } catch(err) {
        console.error(err.message);
        if(err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Concert not found" });
        }
        res.status(500).send("Server error");
    }
});
//
// // @route  DELETE api/posts/:id
// // @desc   Delete a post
// // @access Private
// router.delete('/:id', auth, async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//
//         if(!post) {
//             return res.status(404).json({ msg: "Post not found" });
//         }
//
//         // Check user is the same as post owner
//         // post.user is ObjectID and req.user.id is String, cast to string
//         if(post.user.toString() !== req.user.id) {
//             return res.status(401).json({ msg: 'User not authorised' });
//         }
//
//         await post.remove();
//
//         res.json({ msg: 'Post removed' });
//
//     } catch(err) {
//         console.error(err.message);
//         if(err.kind === "ObjectId") {
//             return res.status(404).json({ msg: "Post not found" });
//         }
//         res.status(500).send("Server error");
//     }
// });
//
// // @route  PUT api/posts/like/:id
// // @desc   Like a post
// // @access Private
// router.put('/like/:id', auth, async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//
//         // Check if already been liked by the user
//         // True if the length of the returned results from filter() is more than 0
//         if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
//             return res.status(400).json({ msg: 'Post already liked' });
//         }
//
//         post.likes.unshift({ user: req.user.id });
//
//         await post.save();
//
//         res.json(post.likes);
//     } catch(err) {
//         console.error(err.message);
//         if(err.kind === "ObjectId") {
//             return res.status(404).json({ msg: "Post not found" });
//         }
//         res.status(500).send("Server error");
//     }
// });
//
// // @route  PUT api/posts/unlike/:id
// // @desc   Unlike a post
// // @access Private
// router.put('/unlike/:id', auth, async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//
//         // Check if already been liked by the user
//         // True if the length of the returned results from filter() is more than 0
//         if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
//             return res.status(400).json({ msg: 'Post has not yet been liked' });
//         }
//
//         // Get remove index
//         const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
//
//         post.likes.splice(removeIndex, 1);
//
//         await post.save();
//
//         res.json(post.likes);
//     } catch(err) {
//         console.error(err.message);
//         if(err.kind === "ObjectId") {
//             return res.status(404).json({ msg: "Post not found" });
//         }
//         res.status(500).send("Server error");
//     }
// });
//
// // @route  POST api/posts/comment/:id
// // @desc   Comment on a post
// // @access Private
// router.post(
//     '/comment/:id',
//     [
//         auth,
//         [
//             check('text', 'Text is required').not().isEmpty()
//         ]
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//
//         try {
//             const user = await User.findById(req.user.id).select('-password');
//
//             const post = await Post.findById(req.params.id);
//
//             const newComment = new Post({
//                 text: req.body.text,
//                 name: user.name,
//                 avatar: user.avatar,
//                 user: req.user.id
//             })
//
//             post.comments.unshift(newComment);
//             await post.save();
//
//             res.json(post.comments); // Once get post, add it to the response
//         } catch(err) {
//             console.error(err.message);
//             res.status(500).send("Server error");
//         }
//
//     });
//
// // @route  DELETE api/posts/comment/:id/:comment_id
// // @desc   Delete a comment from a post
// // @access Private
// router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//
//         // Pull out comment from post
//         const comment = post.comments.find(comment => comment.id === req.params.comment_id);
//
//         // Make sure comment exists
//         if(!comment) {
//             return res.status(404).json({ msg: "Comment does not exist" });
//         }
//
//         // Check user is the same as comment owner
//         // post.user is ObjectID and req.user.id is String, cast to string
//         if(comment.user.toString() !== req.user.id) {
//             return res.status(401).json({ msg: 'User not authorised' });
//         }
//
//         // Get remove index
//         const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
//
//         post.comments.splice(removeIndex, 1);
//
//         await post.save();
//
//         res.json(post.comments);
//
//
//     } catch(err) {
//             console.error(err.message);
//             res.status(500).send("Server error");
//     }
// });

module.exports = router;