const mongoose = require("mongoose");
const util = require('util')
const fs = require('fs');
let mongooseDynamic = require('mongoose-dynamic-schemas');
// require("../models/userModel");
// const Users = require("../models/userModel");
// let ObjectId = require('mongodb').ObjectID;

const crudCtrl = {
  createField: async (req, res) => {
    try {
      const { model, values, forallusersflag, fields, modelRef } = req.body;

      let collectionExistsFlag = false;
      const test = mongoose.connection.db.listCollections({ name: model + 's' })
        .next(async function (err, collinfo) {
          if (collinfo && collinfo.name == model + 's') {
            // The collection exists
            console.log(`Collection ${model} exists`);
            collectionExistsFlag = true;
          } else {
            // No existe
            console.log(`Collection ${model} doesnt exists`);
            let schemaDinamicObject = {}

            console.log('schemaDinamicObject', util.inspect(schemaDinamicObject));
            console.log(util.inspect(schemaDinamicObject));

            const dinamicSchema = new mongoose.Schema(schemaDinamicObject, {
              timestamps: true,
              strict: false
            });

            const newSchema = mongoose.model(model, dinamicSchema);

            const newSchemaProps = {
              user: req.authUser._id,
            }

            for (const key in values) {
              newSchemaProps[key] = values[key]
            }

            console.log(util.inspect(newSchemaProps));

            const newRow = new newSchema(newSchemaProps);
            await newRow.save();

            // Guardar en sistema de archivos

            // const test = newSchema.find()

            // console.log('newSchema', util.inspect(test));
          
            // Change the content of the file as you want
            // or either set fileContent to null to create an empty file
            const UppModelName = model.charAt(0).toUpperCase() + model.slice(1);
            // const schemaContent = JSON.stringify(schemaDinamicObject)
            const fileContent = `
              const mongoose = require("mongoose");
              const ${UppModelName}Schema = new mongoose.Schema({type: String, required: true},${JSON.stringify({
              timestamps: true,
              strict: false
            })});
              module.exports = mongoose.model('${model}', ${UppModelName}Schema);
            `;

            // The absolute path of the new file with its name
            const filepath = `./models/${model}Model.js`;

            fs.writeFile(filepath, fileContent, (err) => {
              if (err) throw err;

              console.log("The file was succesfully saved!");
            });
          }
        });

      // console.log('collectionExistsFlag')
      // console.log(collectionExistsFlag)
      // console.log(test)
      // let filter = {}

      // if (!forallusersflag) {
      //   filter._id = req.authUser._id
      // } else {
      //   if (req.authUser.role != 'admin')
      //     filter._id = req.authUser._id
      // }

      // const dinamicObjectId = new mongoose.Types.ObjectId()
      // const objNewRow = { id: dinamicObjectId.toString() }

      // Object.defineProperty(objNewRow, Object.keys(values)[0], {
      //   value: Object.values(values)[0],
      //   writable: true,
      //   enumerable: true,
      //   configurable: true
      // });

      // Object.defineProperty(values, Object.keys(values)[0], {
      //   value: objNewRow,
      //   writable: true,
      //   enumerable: true,
      //   configurable: true
      // });

      // const DinamicModelCall = mongoose.model(model);
      // await DinamicModelCall.updateOne(
      //   filter,
      //   { $push: values }, { upsert: true }  // or $set
      // );

      // values.createdAt = 'nothing'
      // values.updatedAt = 'nothing'
      // const data = await DinamicModelCall.find(filter).select(Object.keys(values))

      res.json({
        msg: "Registro añadido",
        // data
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getDataField: async (req, res) => {

    // const test = require("../models/userModel")
    // console.log(util.inspect(await test.find()))
    // return;

    // console.log(util.inspect(req))
    // return;
    const { model, forallusersflag, fields, fieldsAndValues } = req.body;

    let filter = {}

    if (!forallusersflag) {
      filter.user = req.authUser._id
    } else {
      if (req.authUser.role != 'admin')
        filter.user = req.authUser._id
    }

    fieldsAndValues.createdAt = 'nothing'
    fieldsAndValues.updatedAt = 'nothing'


    // console.log(filter)
    // let schemaDinamicObject = {}

    // for (const key in fields) {
    //   console.log(`${key}: ${fields[key]}`);
    //   schemaDinamicObject[key] = {
    //     type: fields[key] == '' ? mongoose.Schema.Types.String : mongoose.Schema.Types.Mixed,
    //     required: true
    //   }
    // }

    // const dinamicSchema = new mongoose.Schema(schemaDinamicObject, {
    //   timestamps: true,
    //   strict: false
    // });

    // const dinamicModelRef = new mongoose.model(model, dinamicSchema);
    const dinamicModelRef = require(`../models/${model}Model`)

    // console.log(await dinamicModelRef.find())

    // const test = mongoose.connection.db.listCollections().toArray(function (err, names) {
    //   console.log(util.inspect(names));
    // })

    // const DinamicModelCall = new mongoose.model(model)
    const data = await dinamicModelRef.find(filter).select(Object.keys(fieldsAndValues))

    // console.log(util.inspect(data, { showHidden: false, depth: null, colors: true }));
    res.json({
      msg: "Datos de los campos"
      , data
    });
  },
  editRow: async (req, res) => {
    try {
      const { id } = req.params
      const { model, forallusersflag, values } = req.body;
      let filter = {}
      let firstKeyValue = Object.keys(values)[0]
      let firstValValue = Object.values(values)[0]
      const DinamicModelCall = mongoose.model(model);

      res.json({
        msg: "Registro editado", data
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
};

module.exports = crudCtrl;
