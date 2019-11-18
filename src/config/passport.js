const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const bcrypt = require("bcryptjs");


const User = require('../models/users');
const mongoose = require('mongoose');


passport.use(new LocalStrategy({

    usernameField: 'username'
}, async(username, password,done) => {
    const user = await User.findOne({user: username});
    if(!user) {
        return done(null, false, {message: 'Usuario no encontrado'})
    } else{
        const match = await user.matchPassword(password);
        if (match){
            return done(null,user);
        } else {
return done(null,false, {message: 'Contraseña Incorrecta'});

        }
    }
}));

passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser((id,done) => {
    Usuario.findById(id,(err,user) => {
        done(err,user);
});
});


module.exports = passport;
