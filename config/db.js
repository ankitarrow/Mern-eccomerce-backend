const mongoose = require("mongoose");

async function connectDB() {
    try {
        console.log(process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;
