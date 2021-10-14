const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const encryption = require('./PasswordEncryption');

require('dotenv').config();

exports.login = async (req, res) => {
    
    console.log("LOGIN:", req.body.data);
    const user = { "username": req.body.data.username, "password": req.body.data.password }

    let hashedPassword = encryption.generateHashForPassword(user.password)
    
    let maybeUser = await User.findOne({
        username: user.username,
    });

    if (!maybeUser) {

        res.send("No such user found")
    }

    if (hashedPassword == maybeUser.hashedPassword) {

        accessToken = jwt.sign({ _id: maybeUser._id, role: maybeUser.role}, process.env.SECRET)

        res.cookie("security", JSON.stringify(accessToken), {
            secure: process.env.NODE_ENV !== "development",
            secure: false,
            httpOnly: true,
        });
        
        res.json({ accessToken: accessToken });

    } else {
        res.send("Password or login incorrect")

    }
};

exports.authenticate = async (req, res, next) => {

    const authHeader = req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.security;

    const token = authHeader && authHeader.split('.')[1]

    if (token == null) return res.sendStatus(401);
    
    let tokenDecoded = jwtDecode(authHeader);

    let user = await User.findById(tokenDecoded._id)

    if (user) {
        verifiedUser = {
            role: user.role,
            _id: user._id
        }
        req.body.user = verifiedUser
        
    } else {
        console.log("WRONG AUTH DATA")
        return res.sendStatus(403);
    }
    
    next();
    
}