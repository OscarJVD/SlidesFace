
              const mongoose = require("mongoose");
              const PhoneSchema = new mongoose.Schema({number:{type:  String, required: true},user: {
                type: mongoose.Types.ObjectId,
                ref: 'user',
              }},{timestamps: true,strict: false});
              module.exports = mongoose.model('phone', PhoneSchema);
            