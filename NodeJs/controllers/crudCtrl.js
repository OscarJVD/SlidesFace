const mongoose = require("mongoose");
// const fs = require('fs');
// let mongooseDynamic = require('mongoose-dynamic-schemas');
// require("../models/userModel");
// const Users = require("../models/userModel");
let ObjectId = require('mongodb').ObjectID;

const crudCtrl = {
  createField: async (req, res) => {
    try {
      const { model, values, forallusersflag } = req.body;

      console.log(req.body)
      console.log(forallusersflag)
      console.log(values)
      console.log(model)
      let filter = {}
      // let resValuesObj = values

      if (!forallusersflag) {
        filter._id = req.authUser._id
      } else {
        if (req.authUser.role != 'admin')
          filter._id = req.authUser._id
      }

      const dinamicObjectId = new mongoose.Types.ObjectId()
      const objNewRow = { id: dinamicObjectId.toString() }

      Object.defineProperty(objNewRow, Object.keys(values)[0], {
        value: Object.values(values)[0],
        writable: true,
        enumerable: true,
        configurable: true
      });

      Object.defineProperty(values, Object.keys(values)[0], {
        value: objNewRow,
        writable: true,
        enumerable: true,
        configurable: true
      });

      const DinamicModelCall = mongoose.model(model);
      await DinamicModelCall.updateOne(
        filter,
        { $push: values }, { upsert: true }  // or $set
      );

      values.createdAt = 'nothing'
      values.updatedAt = 'nothing'
      const data = await DinamicModelCall.find(filter).select(Object.keys(values))

      res.json({
        msg: "Registro añadido",
        data
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getDataField: async (req, res) => {

    const { model, forallusersflag, fieldsAndValues } = req.body;

    let filter = {}

    if (!forallusersflag) {
      filter._id = req.authUser._id
    } else {
      if (req.authUser.role != 'admin')
        filter._id = req.authUser._id
    }

    fieldsAndValues.createdAt = 'nothing'
    fieldsAndValues.updatedAt = 'nothing'

    const DinamicModelCall = mongoose.model(model);
    const data = await DinamicModelCall.find(filter).select(Object.keys(fieldsAndValues))

    res.json({
      msg: "Datos de los campos", data
    });
  },
  editRow: async (req, res) => {
    try {
      const { id } = req.params
      const { model, forallusersflag, values } = req.body;
      let filter = {}
      let firstKeyValue = Object.keys(values)[0]
      let firstValValue = Object.values(values)[0]

      Object.defineProperty(filter, firstKeyValue, {
        value: { $elemMatch: { id } },
        writable: true,
        enumerable: true,
        configurable: true
      });

      delete values[firstKeyValue]
      let valKey = `${firstKeyValue}.$.${firstKeyValue}`
      values[valKey] = firstValValue

      // console.log(values)

      const DinamicModelCall = mongoose.model(model);
      // const updated = await DinamicModelCall.updateOne(filter, { $set: values }
      //   , { upsert: true , multi: true}
      // );

      // const updated = await DinamicModelCall.findOneAndUpdate(filter, { $set: values }
      //   , { upsert: true , multi: true}
      // );

      // const collection = await DinamicModelCall.find(filter);

      // collection[0][firstKeyValue].forEach((elem, index) => {
      //   if (elem.id == id) {
      //     collection[0][firstKeyValue][index][firstKeyValue] = firstValValue
      //     return;
      //   }
      // })

      // let objectToUpdate = {};
      // console.log(collection[0][firstKeyValue])
      // console.log(objectToUpdate)
      // objectToUpdate[firstKeyValue] = collection[0][firstKeyValue]
      // updateOne
      // const res = await DinamicModelCall.findOne(filter, function (err, document) {
      //   // user.username = newUser.username;
      //   // console.log(document)
      //   document[firstKeyValue].forEach((elem, index) => {
      //     if (elem.id == id) {
      //       document[firstKeyValue][index][firstKeyValue] = firstValValue
      //       return;
      //     }
      //   })

      //   document.save(function (err) {
      //     if (err) {
      //       console.log('ERROR!');
      //     }
      //   });
      // }).clone();

      // console.log(res)

      // const subDocUpdating = await DinamicModelCall.findOneAndUpdate(
      //   filter,
      //   objectToUpdate
      // );

      // const subDocUpdating = await DinamicModelCall.updateOne(
      //   filter,
      //   objectToUpdate
      // );

      values.createdAt = 'nothing'
      values.updatedAt = 'nothing'
      const data = await DinamicModelCall.find(filter).select(Object.keys(values))

      res.json({
        msg: "Registro editado", data
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
};

module.exports = crudCtrl;
