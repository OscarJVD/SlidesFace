const mongoose = require("mongoose");
const util = require('util')
const fs = require('fs');
// const fsPromises = require("fs/promises");
// let mongooseDynamic = require('mongoose-dynamic-schemas');
// require("../models/userModel");
// const Users = require("../models/userModel");
// let ObjectId = require('mongodb').ObjectID;
// const { sort } = require('../utils/functions');

const crudCtrl = {
  createField: async (req, res) => {
    try {
      const { model, values, forallusersflag, fields, modelRef } = req.body;

      let filter = {}

      if (!forallusersflag) {
        filter.user = req.authUser._id
      } else {
        if (req.authUser.role != 'admin')
          filter.user = req.authUser._id
      }

      const test = mongoose.connection.db.listCollections({ name: model + 's' })
        .next(async function (err, collinfo) {
          console.log(`Collection ${model} doesnt exists`);
          let schemaDinamicObject = {}

          console.log('schemaDinamicObject', util.inspect(schemaDinamicObject));
          console.log(util.inspect(schemaDinamicObject));

          const dinamicSchemaCall = new mongoose.Schema(schemaDinamicObject, {
            timestamps: true,
            strict: false
          });

          const newSchemaProps = {
            user: req.authUser._id,
          }

          for (const key in values) {
            newSchemaProps[key] = values[key]
          }

          // const newSchema = mongoose.model(model, dinamicSchemaCall);
          console.log(util.inspect(newSchemaProps));

          if (collinfo && collinfo.name == model + 's') {
            const dinamicModelRef = require(`../models/${model}Model`)
            // The collection exists
            console.log(`Collection ${model} exists`);
            const newRow = new dinamicModelRef(newSchemaProps);
            await newRow.save();
            collectionExistsFlag = true;
          } else {
            // No existe
            delete mongoose.connection.models[model.charAt(0).toUpperCase() + model.slice(1)];

            const dinamicNewSchema = mongoose.model(model, dinamicSchemaCall);
            const newRow = new dinamicNewSchema(newSchemaProps);
            await newRow.save();

            const UppModelName = model.charAt(0).toUpperCase() + model.slice(1);

            let schemaObj = ``

            for (const keyField in fields) {
              schemaObj += `${keyField}:{type:  ${typeof fields[keyField] == 'string' ? `String` : `Number`}, required: true},`
            }

            const fileContent = `
              const mongoose = require("mongoose");
              const ${UppModelName}Schema = new mongoose.Schema({${schemaObj}user: {
                type: mongoose.Types.ObjectId,
                ref: 'user',
              },
              historic: { type: Array, required: false }
            },{timestamps: true,strict: false});
              module.exports = mongoose.model('${model}', ${UppModelName}Schema);
            `;

            const filepath = `./models/${model}Model.js`;

            console.log(util.inspect(fileContent));

            fs.writeFileSync(filepath, fileContent, (err) => {
              if (err) throw err;

              console.log("The file was succesfully saved!");
            });
          }
        });

      res.json({ msg: "Registro añadido" });
    } catch (error) {
      console.log('ERROR - ERROR - ERROR')
      console.log(util.inspect(error));
      console.log(error)
      return res.status(500).json({ msg: error.message });
    }
  },
  getDataField: async (req, res) => {

    const { model, forallusersflag, fields, fieldsAndValues } = req.body;

    let filter = {}

    if (!forallusersflag) {
      filter.user = req.authUser._id
    } else {
      if (req.authUser.role != 'admin')
        filter.user = req.authUser._id
    }

    const filePath = `./models/${model}Model.js`
    if (fs.existsSync(filePath)) {
      console.log("El archivo EXISTE!");
      const dinamicModelRef = require(`../models/${model}Model`)
      const data = await dinamicModelRef.find(filter)
      // util.inspect('data')
      console.log(util.inspect(data))

      // const sortedData = sort(data)
      // util.inspect('sortedData')
      // console.log(util.inspect(sortedData))

      res.json({
        msg: "Datos de los campos"
        , data
      });
    } else {
      console.log("El archivo NO EXISTE!");
      res.json({
        msg: "No hay datos aún"
      });
    }
    // .select(Object.keys(fieldsAndValues))

  },
  editRow: async (req, res) => {
    try {
      const { id } = req.params
      const { model, forallusersflag, values } = req.body;

      let filter = { _id: id }

      if (!forallusersflag) {
        filter.user = req.authUser._id
      } else {
        if (req.authUser.role != 'admin')
          filter.user = req.authUser._id
      }

      const DinamicModelCall = require(`../models/${model}Model`)
      await DinamicModelCall.findOneAndUpdate(filter, values);

      res.json({ msg: "Registro editado" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  softDeleteRow: async (req, res) => {
    try {
      const { id } = req.params
      const { model, forallusersflag, item } = req.body;

      let filter = { _id: id }

      if (!forallusersflag) {
        filter.user = req.authUser._id
      } else {
        if (req.authUser.role != 'admin')
          filter.user = req.authUser._id
      }

      const DinamicModelCall = require(`../models/${model}Model`)
      const row = await DinamicModelCall.findById(id)
      if (!row) return res.status(400).json({ msg: "Fila no encontrada. Error: FI001" });

      const test = mongoose.connection.db.listCollections({ name: model + 'historic' + 's' })
        .next(async function (err, collinfo) {
          console.log(`Collection ${model} doesnt exists`);
          let schemaDinamicObject = {}

          console.log('schemaDinamicObject', util.inspect(schemaDinamicObject));
          console.log(util.inspect(schemaDinamicObject));

          const dinamicSchemaCall = new mongoose.Schema(schemaDinamicObject, {
            timestamps: true,
            strict: false
          });

          const newSchemaProps = {
            user: req.authUser._id,
          }

          if (collinfo && collinfo.name == model + 'historics') {
            const dinamicModelRef = require(`../models/${model}historicModel`)
            // The collection exists
            console.log(`Collection ${model} exists`);
            // const newRow = new dinamicModelRef(newSchemaProps);
            // await newRow.save();
            await dinamicModelRef.update(
              {},
              { $push: { historic: item } }, { upsert: true }  // or $set
            );
            collectionExistsFlag = true;
          } else {
            // No existe
            delete mongoose.connection.models[model.charAt(0).toUpperCase() + model.slice(1) + 'historic'];

            newSchemaProps.historic = [item]
            const dinamicNewSchema = mongoose.model(model + 'historic', dinamicSchemaCall);
            const newRow = new dinamicNewSchema(newSchemaProps);
            await newRow.save();

            // await DinamicModelCall.update(
            //   filter,
            //   { $push: { historic: item } }, { upsert: true }  // or $set
            // );

            const UppModelName = model.charAt(0).toUpperCase() + model.slice(1) + 'historic';

            const fileContent = `
            const mongoose = require("mongoose");
            const ${UppModelName}Schema = new mongoose.Schema({${model}: {
              type: mongoose.Types.ObjectId,
              ref: '${model}',
            },
            
            historic: { type: Array, required: false }
          },{timestamps: true,strict: false});
            module.exports = mongoose.model('${model + 'historic'}', ${UppModelName}Schema);
          `;

            const filepath = `./models/${model}historicModel.js`;

            console.log(util.inspect(fileContent));

            fs.writeFileSync(filepath, fileContent, (err) => {
              if (err) throw err;

              console.log("The file was succesfully saved!");
            });
          }
        });

      await DinamicModelCall.findByIdAndDelete(item._id)

      return res.json({ msg: "Registro eliminado" });
    } catch (error) {
      console.log(error)
      console.log(util.inspect(error))
      return res.status(500).json({ msg: error.message });
    }
  }
};

module.exports = crudCtrl;
