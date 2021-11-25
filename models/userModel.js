const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 25
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 25
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 25
  },
  username: {
    type: String,
    required: false,
    trim: true,
    maxlength: 25,
  },
  email: {
    type: String,
    required: false,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://res.cloudinary.com/linda-leblanc/image/upload/v1634579968/test/sg8cthiiicwehkmnynsm.png"
  },
  role: { type: String, default: "user" },
  gender: { type: String, default: "male" },
  mobile: {
    type: String,
    default: "",
    required: false,
    trim: true,
  },
  address: { type: String, default: "" },
  story: {
    type: String,
    default: "",
    maxlength: 200
  },
  website: { type: String, default: "" },
  followers: [
    { type: mongoose.Types.ObjectId, ref: "user" }
  ],
  following: [
    { type: mongoose.Types.ObjectId, ref: "user" }
  ]
}, {
  timestamps: true
})

module.exports = mongoose.model("user", userSchema);