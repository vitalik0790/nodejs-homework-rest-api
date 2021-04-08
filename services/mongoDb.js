const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const URI = process.env.URI_DB;

const mongoDbConnect = mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection succesful");
});

mongoose.connection.on("error", (error) => {
  console.log(`Database connection error: ${error.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(1);
});

module.exports = mongoDbConnect;
