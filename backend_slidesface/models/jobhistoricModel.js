
            const mongoose = require("mongoose");
            const JobhistoricSchema = new mongoose.Schema({job: {
              type: mongoose.Types.ObjectId,
              ref: 'job',
            },
            
            historic: { type: Array, required: false }
          },{timestamps: true,strict: false});
            module.exports = mongoose.model('jobhistoric', JobhistoricSchema);
          