const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route  POST api/users
// @desc   Register user
// @access Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if(user) {
                return res.status(400).json({ errors: [ { msg: 'User already exists' } ] }); // 400 because bad req.
            }

            const avatar = gravatar.url(email, {
                s: '200', // Size
                r: 'pg',  // Rating
                d: 'mm'   // default (so something's there if there isn't an avatar)
            })

            user = new User({
                name,
                email,
                avatar,
                password
            });

            const salt = await bcrypt.genSalt(10); // 10 is recommended in documentation, higher slow but better

            user.password = await bcrypt.hash(password, salt); // Takes in pass and salt and puts into user.password

            await user.save(); // As its a promise, we use await, but anyway, let's save
//             res.send('User registered');

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
