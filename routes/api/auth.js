const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); // Import the middleware
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

// @route  GET api/auth
// @desc   Test route
// @access Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Leave off the password in the data
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route  POST api/auth
// @desc   Authenticate user and get token
// @access Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password',
          'Password is required.'
         ).exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if(!user) { // Check if there's not a user and if not, send an error
                return res
                    .status(400)
                    .json({ errors: [ { msg: 'Invalid credentials' } ] }); // 400 because bad req.
            }

            const isMatch = await bcrypt.compare(password, user.password); // Takes plaintext password from above, plus encrypted

            if(!isMatch) { // Send error if credentials are incorrect
                return res
                    .status(400)
                    .json({ errors: [ { msg: 'Invalid credentials' } ] }); // 400 because bad req.
            }

            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                     { expiresIn: 360000 }, // [optional/recommended] 3600 is an hour but extended to *100 for testing
                     (err, token) => { // callback to check for the error
                        if (err) throw err;
                        res.json({ token });
                     });
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
});


module.exports = router;
