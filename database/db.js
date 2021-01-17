const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database Connection Successful.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = databaseConnection;
