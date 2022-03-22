const mongoose = require("mongoose");
const fs = require('fs');
let mongooseDynamic = require('mongoose-dynamic-schemas');
// require("../models/userModel");
const Users = require("../models/userModel");

const crudCtrl = {
  createField: async (req, res) => {
    try {
      console.log(req.body);
      const { modelToAlter, values, forallusersflag } = req.body;

      console.log('values', values)
      console.log('req.body', req.body);

      let manyFields = false
      if (req.body.hasOwnProperty('fields')) {
        console.log('Si tiene artos campos');
        manyFields = true
      } else if (req.body.hasOwnProperty('fieldname')) {
        console.log('No tiene artos campos');
        manyFields = false
      }

      console.log(req.body.fieldname);
      let dinamicFieldObj = {}
      // Object.values(values).forEach(value => {
      //   Object.defineProperty(dinamicFieldObj, req.body.fieldname, {
      //     value: value,
      //     writable: true,
      //     enumerable: true,
      //     configurable: true
      //   })
      // })

      for (const key in values) {
        console.log(`${key}: ${values[key]}`);
        if(key){
          Object.defineProperty(dinamicFieldObj, key, {
            value: values[key],
            writable: true,
            enumerable: true,
            configurable: true
          })
        }
      }

      if (modelToAlter == 'Users') {

        let forAllUserObj = {}

        if (!forallusersflag) {
          forAllUserObj._id = req.authUser._id
        } else {
          if (req.authUser.role != 'admin')
            forAllUserObj._id = req.authUser._id
        }


        console.log('dinamicFieldObj', dinamicFieldObj)
        const newUserDoc = await Users.updateOne(
          forAllUserObj,
          // { $push: { fieldname: ['aksjdh'] } }, { upsert: true } // or $set
          { $push: dinamicFieldObj }, { upsert: true }  // or $set
        );

        console.log(newUserDoc.doc, 'newUserDoc.doc END');
        console.log(newUserDoc);
        // if (!manyFields)
        //   mongooseDynamic.addSchemaField(Users, './models/userModel.js', { type: Array, required: true })
        // else {

        // }
        // fieldExists = Users.find({ fieldname: { $exists: true, $ne: null } }) // validar si el campo existe
        // fieldExists = await Users.find({ "email": { $exists: true } }).exec().lean(); // validar si el campo existe
        // fieldExists = await Users.find({ "asdlfjhasjkdhkj": { $exists: true } }).lean() // validar si el campo existe
        // fieldExists = await Users.find({ 'email': { $exists: true } }).lean().exec() // validar si el campo existe
        // Users.find({ xcv: { $exists: true } }, function (err, data) {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     console.log(data)
        //   }
        // });

        // // fieldExists = Users.find({ email: { $exists: true } }) // validar si el campo existe
        // // const test2 = Users.find({ email: { $exists: true } }) // validar si el campo existe
        // // const test = Users.find()
        // // console.log(test)
        // // console.log(test2)
        // console.log('fieldExists', fieldExists)
        // newField(fieldExists, modelToAlter, fieldname)
      }



      // VALIDAR EXISTENCIA DEL MODELO O CREARLO
      // let currentModels = []
      // fs.readdir('./models/', function (err, files) {
      //   if (err) {
      //     console.error(err);
      //     return;
      //   }

      //   files.forEach(file => currentModels.push(file))
      // });

      // if (currentModels && currentModels.length > 0) {
      //   currentModels.forEach(model => {
      //     if ((model.trim().slice(0, -8) + 's').toLowerCase() != modelToAlter.trim().toLowerCase()) { // userModel.js
      //       console.log('El modelo no existe, se crea');

      //       //   var dogSchema = mongoose.Schema({
      //       //     name: {type : String, required : true, default : "No name"},
      //       //     color : {type : String, required : true, default : "No color"},
      //       //     breed : {type : String, required : true, default : "No breed"},
      //       //     age : {type : String, required : true, default : "5"},
      //       //     children : {type : Number, required : true, default : 2},
      //       // });

      //       // var Dog = mongoose.model('Dogs', dogSchema);
      //     }
      //   })
      // }

      // res.json({
      //   msg: "Presentación actualizada.",
      //   user: userDoc,
      // });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

// const newField = (model, field) => {
//   if (!fieldExists) // si no existe el campo lo crea 
//     mongooseDynamic.addSchemaField(model, field, { type: Array, required: true })
// }

module.exports = crudCtrl;
