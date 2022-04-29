
            const mongoose = require("mongoose");
            const PersonalemailhistoricSchema = new mongoose.Schema({personalemail: {
              type: mongoose.Types.ObjectId,
              ref: 'personalemail',
            },
            
            historic: { type: Array, required: false }
          },{timestamps: true,strict: false});
            module.exports = mongoose.model('personalemailhistoric', PersonalemailhistoricSchema);
          