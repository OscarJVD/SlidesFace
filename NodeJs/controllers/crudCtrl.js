const mongoose = require("mongoose");
const fs = require('fs');
let mongooseDynamic = require('mongoose-dynamic-schemas');
// require("../models/userModel");
const Users = require("../models/userModel");
let ObjectId = require('mongodb').ObjectID;

const crudCtrl = {
  createField: async (req, res) => {
    try {
      console.log(req.body);
      const { model, values, forallusersflag } = req.body;

      console.log('values', values)
      console.log('req.body', req.body);

      // let manyFields = false
      // if (req.body.hasOwnProperty('fields')) {
      //   console.log('Si tiene artos campos');
      //   manyFields = true
      // } else if (req.body.hasOwnProperty('fieldname')) {
      //   console.log('No tiene artos campos');
      //   manyFields = false
      // }

      // console.log(req.body.fieldname);
      // let dinamicFieldObj = {}
      // Object.values(values).forEach(value => {
      //   Object.defineProperty(dinamicFieldObj, req.body.fieldname, {
      //     value: value,
      //     writable: true,
      //     enumerable: true,
      //     configurable: true
      //   })
      // })

      // for (const key in values) {
      //   console.log(`${key}: ${values[key]}`);
      //   if (key) {
      //     Object.defineProperty(dinamicFieldObj, key, {
      //       value: values[key],
      //       writable: true,
      //       enumerable: true,
      //       configurable: true
      //     })
      //   }
      // }

      if (model == 'Users') {

        let forAllUserObj = {}

        if (!forallusersflag) {
          forAllUserObj._id = req.authUser._id
        } else {
          if (req.authUser.role != 'admin')
            forAllUserObj._id = req.authUser._id
        }

        // values._id = new mongoose.Types.ObjectId();
        values.phones = { _id: new mongoose.Types.ObjectId(), phone: Object.values(values)[0] }
        console.log(values);
        // console.log('dinamicFieldObj', dinamicFieldObj)
        const newUserDoc = await Users.updateOne(
          forAllUserObj,
          // { $push: { fieldname: ['aksjdh'] } }, { upsert: true } // or $set
          { $push: values }, { upsert: true }  // or $set
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

      res.json({
        msg: "Registro añadido",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getDataField: async (req, res) => {

    const { model, forallusersflag, fieldsAndValues } = req.body;

    let forAllUserObj = {}

    if (!forallusersflag) {
      forAllUserObj._id = req.authUser._id
      // forAllUserObj._id = "6239d26047632f8dec8aa018"
    } else {
      if (req.authUser.role != 'admin')
        forAllUserObj._id = req.authUser._id
      // forAllUserObj._id = "6239d26047632f8dec8aa018"
    }

    let dataFields;
    fieldsAndValues.createdAt = 'nothing'
    fieldsAndValues.updatedAt = 'nothing'
    if (model == 'Users') {
      dataFields = await Users.find(forAllUserObj).select(Object.keys(fieldsAndValues))
    }

    let resObj = {}
    Object.defineProperty(resObj, model, {
      value: dataFields,
      writable: true,
      enumerable: true,
      configurable: true
    })

    res.json({
      msg: "Datos de los campos",
      data: resObj
    });
  },
  editRow: async (req, res) => {
    let filter = {}
    try {
      const { id } = req.params
      const { model, forallusersflag, values } = req.body;

      console.log('values');
      console.log(values);
      // console.log(req.params);
      // console.log(req.body);
      // console.log('eq.authUser._id', req.authUser._id)
      // if (!forallusersflag) {
      //   filter._id = req.authUser._id
      // } else {
      //   if (req.authUser.role != 'admin')
      //     filter._id = req.authUser._id
      // }
      // console.log('filter', filter);

      // filter.phones._id = new mongoose.Types.ObjectId(id) // 1ra forma
      // filter.phones = new mongoose.Types.ObjectId(id) // 1ra forma
      // filter.phones = { $elemMatch: { _id: id } } // 1ra forma
      Object.defineProperty(filter, "phones", {
        // Object.defineProperty(filter, "phones.[$]._id", {
        // value: { $elemMatch: { phone: "31213213123" } },
        value: { $elemMatch: { _id: ObjectId(id) } },
        // value: id,
        // value: {_id: id},
        // values: new mongoose.Types.ObjectId(id),
        writable: true,
        enumerable: true,
        configurable: true
      })

      console.log(id);
      console.log(filter);
      // values.phones = { "phones.$._id": id, "phones.$.phone": Object.values(values)[0] } // 2da forma
      // Object.defineProperty(values, "phones.$._id", {
      //   value: id,
      //   writable: true,
      //   enumerable: true,
      //   configurable: true
      // })
      let phoneVal = values.phones
      delete values.phones

      // Object.defineProperty(values, "phones.$[].phone", {
      //   value: phoneVal,
      //   writable: true,
      //   enumerable: true,
      //   configurable: true
      // })
      // Object.defineProperty(values, "phones.$.phone", {
      //   value: phoneVal,
      //   writable: true,
      //   enumerable: true,
      //   configurable: true
      // })

      // Object.defineProperty(values, "phones.$[phone]", {
      Object.defineProperty(values, "phones.$.phone", {
        // value: [{
        //   phone: phoneVal,
        //   _id: id
        // }],
        //
        value: '1111',
        // value: {
        //   phone: phoneVal,
        //   // _id: id
        // },
        //  value: {
        //   phone: phoneVal,
        //   _id: id
        // },
        // value: {
        //   $elemMatch: { _id: id },
        //   phone: phoneVal
        // },
        // value: phoneVal,
        // value: {"phones.$[el].phone": phoneVal },
        writable: true,
        enumerable: true,
        configurable: true
      })

      let dataFields;
      if (model == 'Users') {
        let test = await Users.find(filter)
        console.log('test')
        console.log(test)
        console.log('end test')

        // dataFields = await Users.updateOne(filter, { $set: values }, { upsert: true })
        dataFields = await Users.updateOne(filter, { $set: values }, {
          // new: true,
          //  safe: true, 
          upsert: true
        })
      }

      res.json({
        msg: "Registro editado",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message, filter });
    }
  }
};

// const newField = (model, field) => {
//   if (!fieldExists) // si no existe el campo lo crea 
//     mongooseDynamic.addSchemaField(model, field, { type: Array, required: true })
// }

module.exports = crudCtrl;
