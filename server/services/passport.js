const passport = require('passport')
const LocalStrategy = require('passport-local');
const User = require('../models/users')

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(async function(id, done){
    try{
        const user = await User.findById(id);

        if(!user)
            throw new Error("User session not found")

        done(null, user) 
        
    }catch(e){
        done(e)
    }
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done)=>{
        try{  
            const user = await User.findOne({email})

            if(!user) 
                throw new Error("No user found")
            
            const isMatch = await user.comparePassword(password)

            if(!isMatch)
                throw new Error("Incorrect password")
            
            done(null, user)

        }catch(e){
            done(e)
        }
    }
))

// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, (email, password, done)=>{
//     User.findOne({email}, function(err, user){
//         if(err)
//             return done(err);
//         if(!user){
//             return done(null, false);
//         }
//         user.comparePassword(password, function(err, isMatch){
//             if(err)
//                 return done(err);
            
//             if(!isMatch)
//                 return done(null, false);
            
//             return done(null, user);
//         });
//     });
// }));