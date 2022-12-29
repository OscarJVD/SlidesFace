
              const mongoose = require("mongoose");
              const TestetSchema = new mongoose.Schema({testet:
            { 
              type:  String, 
              required: true,
               
               
               
               
               },user: {
                type: mongoose.Types.ObjectId,
                ref: 'user',
              },
              historic: { type: Array, required: false }
            },{timestamps: true,strict: false});
              module.exports = mongoose.model('testet', TestetSchema);
            