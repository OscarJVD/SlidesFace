const mongoose = require("mongoose");
const util = require('util')
const fs = require('fs');

const crudCtrl = {
  createField: async (req, res) => {
    try {
      const { model, values, forallusersflag, newFields, fields, modelRef } = req.body;

      // console.log(util.inspect(values));
      // console.log('fields:')
      // console.log(util.inspect(fields));
      // return;
      const isArrFields = Array.isArray(fields)
      const existsNewFields = newFields && newFields.length > 0 && Array.isArray(newFields)
      const newFieldsFlag = isArrFields && existsNewFields ? true : false

      // VALIDACIÓN DE DATOS NO VACIOS
      let fieldValues = Object.values(values), resReturnFlag = { bool: false, fieldName: '' }
      if (newFieldsFlag) {
        newFields.forEach(newField => {
          if (newField.required && !newField.value) {
            resReturnFlag.bool = true
            resReturnFlag.fieldName = newField.inputAndModelName + ' - ' + newField.title
          }
        })
      } else {
        fieldValues.map(value => {
          if (value == '' || !value) resReturnFlag.bool = true
        })
      }

      if (resReturnFlag.bool)
        return res.status(400).json({ msg: `${resReturnFlag.fieldName ? `El campo ${resReturnFlag.fieldName} es obligatorio.` : 'Todos los campos son obligatorios.'}` });
      // END VALIDACIÓN DE DATOS NO VACIOS

      let filter = {}

      if (!forallusersflag) {
        filter.user = req.authUser._id
      } else {
        if (req.authUser.role != 'admin')
          filter.user = req.authUser._id
      }

      let schemaDinamicObject = {}

      const dinamicSchemaCall = new mongoose.Schema(schemaDinamicObject, {
        timestamps: true,
        strict: false
      });

      const newSchemaProps = {
        user: req.authUser._id,
      }

      if (newFieldsFlag) {
        newFields.forEach(newField => {
          newSchemaProps[newField.inputAndModelName] = newField.value
        })
      } else {
        for (const key in values)
          newSchemaProps[key] = values[key]
      }

      let models = mongoose.modelNames()
      if (models.includes(model)) {
        const dinamicModelRef = require(`../models/${model}Model`)
        // The collection exists
        console.log(`Collection ${model} exists`);
        const newRow = new dinamicModelRef(newSchemaProps);
        await newRow.save();
        collectionExistsFlag = true;
      } else {
        // No se ha compilado el modelo
        delete mongoose.connection.models[model.charAt(0).toUpperCase() + model.slice(1)];
        const dinamicNewSchema = mongoose.model(model, dinamicSchemaCall);
        const newRow = new dinamicNewSchema(newSchemaProps);
        await newRow.save();

        const UppModelName = model.charAt(0).toUpperCase() + model.slice(1);

        let schemaObj = ``

        if (newFieldsFlag) {
          newFields.forEach(newField => {
            let type;

            if (newField.type == 'text' || newField.type == 'string' || newField.type == '') type = `String`
            if (newField.type == 'number' || newField.type == 0) type = `Number`

            schemaObj += `${newField.inputAndModelName}:
            { 
              type:  ${type}, 
              ${newField.required ? `required: ${`${newField.required ? `true` : `false`},`}` : ` `}
              ${newField.unique ? `unique: ${`${newField.unique}`},` : ` `}
              ${newField.trim ? `trim: ${`${newField.trim}`},` : ` `}
              ${newField.default ? `default: ${`${newField.default}`},` : ` `}
              ${newField.minlength ? `minlength: ${`${newField.minlength}`},` : ` `}
              ${newField.maxlength ? `maxlength: ${`${newField.maxlength}`},` : ` `}},`
          })
        } else {
          for (const keyField in fields) {
            schemaObj += `${keyField}:{type:  ${typeof fields[keyField] == 'string' ? `String` : `Number`}, required: true},`
          }
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

      res.json({ msg: "Registro añadido" });
    } catch (error) {
      console.log('ERROR - ERROR - ERROR')
      console.log(util.inspect(error));
      console.log(error)
      return res.status(500).json({ msg: error.message });
    }
  },
  getDataField: async (req, res) => {

    const { model, forallusersflag, otherUser, fields, fieldsAndValues } = req.body;

    let filter = {}

    if (!forallusersflag) {
      filter.user = req.authUser._id
    } else {
      if (req.authUser.role != 'admin')
        filter.user = req.authUser._id
    }

    if (otherUser) filter.user = otherUser

    const filePath = `./models/${model}Model.js`
    if (fs.existsSync(filePath)) {
      console.log("El archivo EXISTE! " + `../models/${model}Model`);
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

      let entries = Object.entries(values)
      let resReturnFlag = false
      entries.map(input => {
        if (input[1] == '' || !input[1]) resReturnFlag = true
      })

      if (resReturnFlag) return res.status(400).json({ msg: 'Todos los campos son obligatorios.' });

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

      console.log('ITEM');
      console.log(util.inspect(item));
      console.log('END ITEM');

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
