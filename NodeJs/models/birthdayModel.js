
              const mongoose = require("mongoose");
              const BirthdaySchema = new mongoose.Schema({birthday:{type:  String, required: true},user: {
                type: mongoose.Types.ObjectId,
                ref: 'user',
              },
              historic: { type: Array, required: false }
            },{timestamps: true,strict: false});
              module.exports = mongoose.model('birthday', BirthdaySchema);
            