const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token)
      return res
        .status(400)
        .json({ msg: "Sin autenticar, vuelva he inicie sesión." });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) return res.status(400).json({ msg: "Token inválido." });

    // Obtener valor de la cookie por medio del token cookie encriptado
    const user = await User.findOne({ _id: decoded.id });

    req.authUser = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = auth;
