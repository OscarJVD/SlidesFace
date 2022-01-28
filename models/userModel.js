const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    username: {
      type: String,
      required: false,
      trim: true,
      maxlength: 25,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
      // default: "https://res.cloudinary.com/linda-leblanc/image/upload/v1634579968/test/sg8cthiiicwehkmnynsm.png"
    },
    banner: {
      type: String,
      required: false,
      // default: "https://res.cloudinary.com/linda-leblanc/image/upload/v1634579968/test/sg8cthiiicwehkmnynsm.png"
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
    workplace: { type: String, default: "" },
    homecity: { type: String, default: "" },
    currentCity: { type: String, default: "" },
    civilStatus: { type: String, default: "" },
    story: {
      type: String,
      default: "",
      maxlength: 200,
    },
    lastLogin: { type: Date, required: false },
    birthday: { type: Date, required: false },
    jobs: { type: Array, required: false },
    universities: { type: Array, required: false },
    secondarySchools: { type: Array, required: false },
    socialLinks: { type: Array, required: false },
    websites: { type: Array, required: false },
    emails: { type: Array, required: false },
    phones: { type: Array, required: false },
    lenguages: { type: Array, required: false }, // muchos
    interests: { type: Array, required: false },  // Mujeres o Hombres o las dos
    media: { type: Array, required: false },
    recentSearches: { type: Array, required: false },
    followers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
