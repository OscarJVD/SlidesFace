
            const mongoose = require("mongoose");
            const BirthdayhistoricSchema = new mongoose.Schema({birthday: {
              type: mongoose.Types.ObjectId,
              ref: 'birthday',
            },
            
            historic: { type: Array, required: false }
          },{timestamps: true,strict: false});
            module.exports = mongoose.model('birthdayhistoric', BirthdayhistoricSchema);
          