const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const bcrypt = require("bcryptjs");


const Usuario = require('../models/usuarios');
const mongoose = require('mongoose');


passport.use(new LocalStrategy({

    usernameField: 'usuario'
}, async(usuario, password,done) => {
    const user = await Usuario.findOne({usuario: usuario});
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
