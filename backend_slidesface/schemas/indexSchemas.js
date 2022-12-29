// Dependencies
var fs = require('fs')
let inflection = require('inflection')
let mongoose = require('mongoose');
const util = require('util');
// Lookup models directory
fs.readdirSync(__dirname).forEach(function (file) {

  console.log(file)
  let filePath = __dirname + "/" + file;

  // console.log(util.inspect(filePath));
  // // Match all .js files but this
  if (file != 'indexSchemas.js' && fs.statSync(filePath).isFile() && file != 'index.js' && /.*.js/.test(file)) {
    // Inflect the model name
    let modelName = inflection.camelize(file.replace('.js', '').replace('-', '_'));

    // console.log('modelName', modelName.replace('Model', '') + 'Schema')
    // Load the model
    let modelSchema = require(filePath)[modelName.replace('Schema', '') + 'Schema'];
    if (typeof modelSchema != 'undefined') {
      mongoose.model(modelName, modelSchema);
      console.log('Loaded model "%s" from file "%s"', modelName, file);
    }
    else {
      console.error('Schema for model "%s" not found in file "%s"', modelName, file);
    }
  };
});