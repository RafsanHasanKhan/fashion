const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema model
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    trim: true,
    minlength: 3,
    required: true, // Ensures email is required
    unique: true, // Ensures no duplicate emails
  },
  photoURL: String,
  role: {
    type: String,
    enum: ['user', 'admin'], // Restrict to specific roles
    default: 'user',
  },
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
