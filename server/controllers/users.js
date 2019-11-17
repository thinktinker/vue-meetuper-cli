const User = require('../models/users');
const passport = require('passport');

const getUsers = function(req, res) {
  User.find({})
        .exec((errors, users) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(users);
  });
}

const getCurrentUser = function(req, res, next) {

  const user = req.user

  if(!user)
    return res.status(422).send("Not Authenticated.")

  return res.json(user)

}

const registerUsers = async function(req, res) {

  try{
    const registrationKeys = Object.keys(req.body);
    const required = ['username', 'name', 'email', 'password', 'passwordConfirmation'];
    const verifyRequired = required.every((key)=>{
      return registrationKeys.includes(key);
    })
    console.log(verifyRequired)

    if(!verifyRequired){
      throw new Error("Please fill in all required fields.");
    }

    if(req.body.password !== req.body.passwordConfirmation)
      throw new Error("Password must be consistent.");

    const user = new User(req.body);

    const result = await user.save();
    
    if(result)
      res.status(200).json(result); 
  }catch(e){
    res.status(422).send({error: "Please fill in all required fields."});
  }
}

const loginUsers = (req, res, next)=>{

  const loginKeys = Object.keys(req.body)
  const required = ['email', 'password'];
  const verifyRequired = required.every((key)=>{
    return loginKeys.includes(key);
  })

  if(!verifyRequired) return res.status(422).send({error: "Please fill in all required fields."});

  if(req.body.email.length === 0) return res.status(422).send({error: "Please type in your email."});

  if(req.body.password.length === 0) return res.status(422).send({error: "Please type in your password."});

  return passport.authenticate('local', function(err, passportUser){

    try{
      if(err)
        throw new Error(err)
      
      if(passportUser){
        req.login(passportUser, function(err){
          if(err)
            throw new Error("Unable to create session")
          
          return res.json(passportUser)
        })
      }
      else{
        throw new Error("Opps. Something went wrong")
      }
    }catch(e){
      const msg = e.message.split(":").pop().trim()
      res.status(422).send({errors: msg})
    }

  })(req, res, next)

};

//create the logout function
const logout = (req, res)=>{
  req.logout()

  return res.json({status: 'Session Destroyed.'})
}

module.exports = {
  getUsers,
  getCurrentUser,
  registerUsers,
  loginUsers,
  logout
}

// const registerUsers = async function(req, res) {

//   const registrationKeys = Object.keys(req.body);
//   const required = ['username', 'name', 'email', 'password', 'passwordConfirmation'];
//   const verifyRequired = required.every((key)=>{
//     return registrationKeys.includes(key);
//   })

//   if(!verifyRequired){
//     return res.status(422).send({error: "Please fill in all required fields."});
//   }

//   if(req.body.password !== req.body.passwordConfirmation)
//     return res.status(422).send({error: "Password must be consistent."});

//   const user = new User(req.body);

//   const result = await user.save();
  
//   if(result)
//     return res.status(422).json(result); 

// }

// const loginUsers = (req, res, next)=>{

//   const loginKeys = Object.keys(req.body)
//   const required = ['email', 'password'];
//   const verifyRequired = required.every((key)=>{
//     return loginKeys.includes(key);
//   })

//   if(!verifyRequired)
//     return res.status(422).send({error: "Please fill in all required fields."});

//   if(req.body.email.length === 0)
//     return res.status(422).send({error: "Please type in your email."});

//   if(req.body.password.length === 0)
//     return res.status(422).send({error: "Please type in your password."});

//   return passport.authenticate('local', function(err, passportUser){
    
//     // let passport address the authentication
//     // passport.authenticate will invoke services/passport.js
//     // to process the user and run the callback (err, passportUser)
    
//     //if an error occurs, return err
//     if(err){
//       return next(err);
//     }
//     //if a user has been returned
//     if(passportUser){
//       // refer to passport's req.login from app.use(passport.initialize()) and 
//       // app.use(passport.session())
//       req.login(passportUser, function(err){
//         if(err)
//           next(err);
        
//         return res.json(passportUser);
//       });
//     }else{
//       req.status(422).send({ errors: { 'authentication': 'Opps. Something went wrong'}});
//     }

//   })(req, res, next)
  
// };

// module.exports = {
//   getUsers,
//   registerUsers,
//   loginUsers
// }