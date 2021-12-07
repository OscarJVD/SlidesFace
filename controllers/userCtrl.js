const Users = require('../models/userModel');

const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const users = await Users.find({ fullname: { $regex: req.query.q } }).limit(8).select("fullname username email mobile avatar");

      console.log(users);

      res.json({ users })
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

module.exports = userCtrl;