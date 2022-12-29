
              const mongoose = require("mongoose");
              const AddressSchema = new mongoose.Schema({address:{type:  String, required: true},user: {
                type: mongoose.Types.ObjectId,
                ref: 'user',
              },
              historic: { type: Array, required: false }
            },{timestamps: true,strict: false});
              module.exports = mongoose.model('address', AddressSchema);
            