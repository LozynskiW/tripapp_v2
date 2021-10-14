const passport = require('passport');
const User = require('../models/User');
const passwordEncryption = require('../security/PasswordEncryption');

exports.registerNewUser = async (req, res) => {

    let newUser = req.body

    try {
        let ExistingUserData = await User.findOne({ $or: [{ 'username': newUser.username }, { 'email': newUser.email }] })
        
        if (ExistingUserData) {
            return res.status(422).json({ message: 'User with that username or email already exists' })
        }

    } catch (err) {
        return res.status(500).json({err})
    }

    try {
        await User.create({
            username: newUser.username,
            hashedPassword: passwordEncryption.generateHashForPassword(newUser.password),
            email: newUser.email
        })
        return res.status(201).json({ message: 'user created' })

    } catch (err) {
        return res.status(500).json({err})
    }

}