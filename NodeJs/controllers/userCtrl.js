const User = require("../models/userModel");
const { isEmailTelOrUserName } = require("../utils/functions");

const userCtrl = {
  searchUser: async (req, res) => {
    try {
      // console.log(req.query.q);
      // console.log(req.authUser);
      // const authUser = await auth(req, res);
      // console.log(authUser);

      const users = await User.find({
        // fullname: { $regex: /^name@company.com$/i },
        // fullname: { $regex: new RegExp(`^${req.query.q}$`, "i") },
        fullname: { $regex: req.query.q, $options: "i" },
        _id: { $nin: [req.authUser._id] }, // data del usuario en sesión (NOT IN DE MYSQL EN MONGOOSE)
      })
        .limit(8)
        .select("fullname username email mobile avatar gender");

      console.log(users);

      return res.json({ users: users.length === 0 ? "empty" : users });
    } catch (error) {
      console.log(error);
      // console.log("users", users);
      return res.status(500).json({ msg: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) return res.status(400).json({ msg: "Usuario no encontrado. Error: US001" });

      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUserByUserName: async (req, res) => {
    try {
      const user = await User.findOne({
        username: req.params.username
      }).select("-password");

      if (!user)
        return res
          .status(400)
          .json({ msg: "El usuario no existe." });

      console.log(user);

      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  setUserName: async (req, res) => {
    try {
      const { username } = req.body;

      console.log(username);

      if (!username)
        return res.status(400).json({ msg: "Ingresa tu nombre de usuario." });

      const usernameValidation = isEmailTelOrUserName(username);

      if (usernameValidation == "error")
        return res.status(400).json({ msg: "Verifica tu nombre de usuario" });

      if (usernameValidation == "usernameerror")
        return res
          .status(400)
          .json({ msg: "Tu nombre de usuario debe tener letras." });

      let usernameFixed = "";
      if (usernameValidation == "username") {
        usernameFixed = username.toLowerCase().replace(/ /g, "");

        const username_exists = await User.findOne({
          username: usernameFixed,
        });

        if (username_exists)
          return res
            .status(400)
            .json({ msg: "El nombre de usuario ya existe." });
      } else {
        return res.status(400).json({ msg: "Verifica tu nombre de usuario" });
      }

      const newUserDoc = await User.findOneAndUpdate(
        { _id: req.authUser._id },
        { username: usernameFixed }
      );

      // console.log(newUserDoc._doc);
      newUserDoc.username = usernameFixed;
      console.log(newUserDoc);

      res.json({
        msg: "Nombre de usuario actualizado correctamente.",
        username: usernameFixed,
        user: newUserDoc,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  setStory: async (req, res) => {
    try {
      const { story } = req.body;

      console.log(story);

      const userDoc = await User.findOneAndUpdate(
        { _id: req.authUser._id },
        { story }
      );

      userDoc.story = story;

      res.json({
        msg: "Presentación actualizada.",
        user: userDoc,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userCtrl;
