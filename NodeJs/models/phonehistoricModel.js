
            const mongoose = require("mongoose");
            const PhonehistoricSchema = new mongoose.Schema({phone: {
              type: mongoose.Types.ObjectId,
              ref: 'phone',
            },
            
            historic: { type: Array, required: false }
          },{timestamps: true,strict: false});
            module.exports = mongoose.model('phonehistoric', PhonehistoricSchema);
          