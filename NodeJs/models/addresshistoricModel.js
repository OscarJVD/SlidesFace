
            const mongoose = require("mongoose");
            const AddresshistoricSchema = new mongoose.Schema({address: {
              type: mongoose.Types.ObjectId,
              ref: 'address',
            },
            
            historic: { type: Array, required: false }
          },{timestamps: true,strict: false});
            module.exports = mongoose.model('addresshistoric', AddresshistoricSchema);
          