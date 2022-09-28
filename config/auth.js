const localStrategy = require('passport-local').Strategy
const bcrypt = require("bcryptjs")
const passport = require('passport')
const User = require('../models/Usuario')




module.exports = (passport)=>{
    passport.use(new localStrategy({usernameField: "email",  passwordField: "password"}, (email, password, done)=>{
        User.findOne({raw: true, where: { email: email }}).then((user)=>{
            if(!user){
                return done(null, false, {message: "Essa conta não exite !"})
            }

            bcrypt.compare(password, user.password, (erro, correta)=>{
                if(correta){
                    return done(null, user)
                }else{
                    return done(null, false, {message: "Dados de acesso incorretos!"})
                }
            })
        })
    }))
}


    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })
    passport.deserializeUser((id, done)=>{
        User.findOne({where: {id: id}}).then((user)=>{
            done(null, user)
        }).catch((err)=>{
            done(err, null)
        })
    })
     

  