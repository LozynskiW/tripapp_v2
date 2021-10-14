const User = require('../models/User')

exports.getUserDetailsById = (req, res) => {
    
    let userDetails = {
        role: req.body.user.role,
        _id: req.body.user._id,
        username: req.body.user.username,
        email: req.body.user.email,
        __v: 0
    }
    res.json(userDetails)
}

exports.getUserByID = async (req, res, next) => {

    let user;

    try {

        user = await User.findById(req.body.user._id);

        if (user == null) {
            return res.status(404).json({ 
                message: "User not found, it's worth thinking how you logged in..."
            })
        }

    } catch (err) {

        return res.status(500).json({
            message: err.message
        })

    }

    req.body.user = user;
    next();
}