import config from "./../config/config";
import app from "./express";
import mongoose from "mongoose";

// Mongoose setup.
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// Server port setup.
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(
    "Server started successfully and listening on port " + config.port + " !"
  );
});