const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const { isEmailTelOrUserName } = require('../utils/functions')

const authCtrl = {
  register: async (req, res) => {
    try {
      const {
        firstname,
        lastname,
        username_email_or_mobile_register,
        new_password,
        gender,
      } = req.body;

      // console.log(isEmailTelOrUserName(username_email_or_mobile_register));
      const registerType = isEmailTelOrUserName(username_email_or_mobile_register)
      if (registerType == 'error') res.status(400).json({ msg: 'Verifica tu usuario, correo o móvil.' });
      if (registerType == 'usernameerror') res.status(400).json({ msg: 'Tu nombre de usuario debe tener letras.' });

      console.log(registerType);

      const schema = new passwordValidator();
      schema.is().min(4).is().max(50);

      if (!schema.validate(new_password))
        return res
          .status(400)
          .json({ msg: 'La contraseña debe ser de minimo a 4 caracteres' });

      const passwordHash = await bcrypt.hash(new_password, 12);

      const fullname = firstname + " " + lastname;

      const userObj = {
        firstname,
        lastname,
        fullname,
        password: passwordHash,
        gender,
      }

      if (registerType == 'username') {
        let shortUserName = username_email_or_mobile_register.toLowerCase().replace(/ /g, '');

        const username_exists = await Users.findOne({ username: shortUserName });
        if (username_exists)
          return res.status(400).json({ msg: 'El nombre de usuario ya existe.' });

        userObj.username = shortUserName;
      }

      if (registerType == 'email') {
        const email_exists = await Users.findOne({ email: username_email_or_mobile_register });
        if (email_exists)
          return res.status(400).json({ msg: 'El correo ya existe.' });

        userObj.email = username_email_or_mobile_register;
      }

      if (registerType == 'tel') {
        const mobile_exists = await Users.findOne({ mobile: username_email_or_mobile_register });
        if (mobile_exists)
          return res.status(400).json({ msg: 'El móvil ya existe.' });

        userObj.mobile = username_email_or_mobile_register;
      }

      console.log(userObj);
      // Creamos el usuario
      const newUser = new Users(userObj);

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refreshTkn',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      await newUser.save();

      res.json({
        msg: '¡Registrado!',
        access_token,
        user: {
          ...newUser._doc,
          password: '',
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email }).populate(
        'followers following',
        'avatar username fullname followers following'
      );

      if (!user) return res.status(400).json({ msg: 'El correo no existe.' });

      const isPassMatch = await bcrypt.compare(password, user.password);
      if (!isPassMatch)
        return res.status(400).json({ msg: 'Contraseña incorrecta' });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refreshTkn',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        msg: '¡Ingreso exitoso!',
        access_token,
        user: {
          ...user._doc,
          password: '',
        },
      });
    } catch (err) {
      // console.log(err.message);
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', { path: '/api/refresh_token' });
      return res.json({ msg: '¡Sesión cerrada!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  genAccessTkn: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: 'Por favor inicia sesión.' });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err)
            return res.status(400).json({ msg: 'Por favor inicia sesión.' });

          // console.log(result);
          const user = await Users.findById(result.id)
            .select('-password')
            .populate('followers following', '-password');

          if (!user)
            return res.status(400).json({ msg: 'Autenticación invalida' });

          const access_token = createAccessToken({ id: result.id });

          res.json({ access_token, user });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = authCtrl;
