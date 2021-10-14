const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User');
const encryption = require('./PasswordEncryption');

function initialize(passport) {

    const verifyUserCallback = async (username, password, done) => {
        
        console.log('Verification START: '+JSON.stringify(user)+" "+user.id)
        if (err) {
            return done(err);
        }

        let hashedPassword = encryption.generateHashForPassword(password)
    
        let maybeUser = await User.findOne({
            username: username,
        });
    
        if (!maybeUser) {

            return done(null, false, { message: 'No such user...' })
            
        } else {

            if (hashedPassword == maybeUser.hashedPassword) {

                let verifiedUser = maybeUser;

                req.logIn(verifiedUser, (err) => {
                    console.log('Verification DONE: '+JSON.stringify(user)+" "+user.id)
                    return done(err);
                })

                return done(null, maybeUser._id)
                
            } else {
                return done(null, false, {message: 'Invalid username or password or else...'})
            }
            
        }
    }
    
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'hashedPassword'
    }, verifyUserCallback))
    
    passport.serializeUser((user, done) => {
        console.log('Serialization: '+JSON.stringify(user))
        done(null, user);
    });
    
    /*
    passport.deserializeUser((id, done) => {
        console.log('DESERIALIZE'+" "+JSON.stringify(id));
        User.findById(id, (err, user) => {
            done(err, user);
        });
        
    });
    */

    passport.deserializeUser((id, done) => {
        console.log('DESERIALIZE'+" "+JSON.stringify(req.passport));
        User.findById(id, (err, user) => {
            done(err, user);
        });
        
    });
    
}
    
module.exports = initialize;