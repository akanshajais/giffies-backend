const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req,res) => {

    User.findOne({ email: req.body.email })
    .exec((error, user) => {
      if (user)
        return res.status(400).json({
          error: "User already registered",
        });
  
        const { firstName, lastName, email, password } = req.body;
        const _user = new User({ 
          firstName:req.body.firstName ,
           lastName:req.body.lastName ,
            email:req.body.email ,
             password:req.body.password,
             username: Math.random().toString()
           });
             _user.save((error, data) => {
                if (error) {
                  return res.status(400).json({
                    message: "Something went wrong",
                  });
                }
          
                if (data) {
                  
                        return res.status(201).json({
                         message:"User Created Successfully"
                        })
                    }
                  });
                });
}
exports.signin = (req,res) => {
  User.findOne({email:req.body.email})
  .exec((error,user) => {
      if(error) return res.status(400).json({error});
      if(user){

          if(user.authenticate(req.body.password)){

              const token = jwt.sign({_id: user._id, role:user.role},process.env.JWT_SECRET,{expiresIn:'3d'});
              const { _id , firstName,lastName,email,role,fullName } = user;
              res.status(200).json({
                  token,
                  user:{
                      _id, firstName,lastName,email,role,fullName
                  }
              });

          }else{
              return res.status(400).json({
                  message:'Invalid Password'
              });
          }

      }else{
          return res.status(400).json({message:'Something Went wrong'})
      }
  });
};
