
              const mongoose = require("mongoose");
              const JobSchema = new mongoose.Schema({workplace:
            { 
              type:  String, 
              required: true,
               
              trim: true,
               
               
               },workplaces:
            { 
              type:  String, 
              required: true,
               
              trim: true,
               
               
               },workplacess:
            { 
              type:  String, 
              required: true,
               
              trim: true,
               
               
               },user: {
                type: mongoose.Types.ObjectId,
                ref: 'user',
              },
              historic: { type: Array, required: false }
            },{timestamps: true,strict: false});
              module.exports = mongoose.model('job', JobSchema);
            