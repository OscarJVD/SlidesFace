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
      const objNewRow = { _id: dinamicObjectId }

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
      let firstKeyValues = Object.keys(values)[0]
      let firstValValues = Object.values(values)[0]

      Object.defineProperty(filter, firstKeyValues, {
        value: { $elemMatch: { _id: ObjectId(id) } },
        writable: true,
        enumerable: true,
        configurable: true
      });

      delete values[firstKeyValues]
      let valKey = `${firstKeyValues}.$.${firstKeyValues}`
      values[valKey] = firstValValues

      const DinamicModelCall = mongoose.model(model);
      const updated = await DinamicModelCall.update(filter, { $set: values }
        , { upsert: true }
      );

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
