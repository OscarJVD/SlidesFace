const mongoose = require("mongoose");

const connectDB = () => {
    if(mongoose.connections[0].readyState){
        console.log(`Already Connected`);
        return;
    }

    mongoose.connect(process.env.MONGODB_URL, {
        // useCreateIndex: true,
        // useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if(err) throw err;
        console.log(`Connected to mongodb.`);
    })
}

module.exports = connectDB;
