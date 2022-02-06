const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20
    },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    hash_password:{
        type: String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    contactNumber:{type : String},
    profilePicture:{type : String }
},{ timestamps:true});

userSchema.pre('save', function(next) {
    if (this.isModified('password')) { //only if password is modified then hash
      return bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
          return next(err);
        }
        this.hash_password =password; //save hash in UserSchema.password in database
        next();
      });
    }
   
  });


userSchema.methods = {
    authenticate: function(password){
        return  bcrypt.compareSync(password,this.hash_password);
    }
}
module.exports = mongoose.model("User", userSchema);

