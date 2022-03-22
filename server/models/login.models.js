const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true
    },
    phonenumber: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    }
}, {timestamps: true});

UserSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
if (this.password !== this.confirmPassword) {
  this.invalidate('confirmPassword', 'Password must match confirm password');
}
next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
    })
      .catch(err => {
          console.log("Error", err);
          next();
      });
});

module.exports.User = mongoose.model('User', UserSchema);