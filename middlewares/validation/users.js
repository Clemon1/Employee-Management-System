const { check } = require('express-validator')


exports.validateUserSignUp = [
    check('firstname').trim().not().isEmpty().withMessage('First Name must not be Empty').isString().withMessage('First Name must be in letters'),
    check('lastname').trim().not().isEmpty().withMessage('Last Name must not be Empty').isString().withMessage('Last Name must be in letters'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid Email'),
    check('password').trim().not().isEmpty().withMessage('Password must not be empty').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

