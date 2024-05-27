const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL

exports.connect = () => {
    mongoose.connect(MONGODB_URL)
        .then(console.log("DB CONNECTED with a success"))
        .catch((error) => {
            console.log("DB connection failed");
            console.log(error);
            process.exit(1)
        })
}