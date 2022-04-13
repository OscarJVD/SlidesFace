
              const mongoose = require("mongoose");
              const PhoneSchema = new mongoose.Schema({type: String, required: true},{"timestamps":true,"strict":false});
              module.exports = mongoose.model('phone', PhoneSchema);
            