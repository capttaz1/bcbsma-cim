import mongoose from "mongoose";
import appConfig from "./env";

mongoose.Promise = Promise;

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connection Established");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB Connection Reestablished");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Connection Disconnected");
});

mongoose.connection.on("close", () => {
  console.log("MongoDB Connection Closed");
});

mongoose.connection.on("error", (error) => {
  console.log("MongoDB ERROR: " + error);
  process.exit(1);
});

mongoose.set("debug", appConfig.mongoDebug);

const connectMongo = async () => {
  let connectionuri = appConfig.dbConnectionString;
  await mongoose.connect(connectionuri, {
    //autoReconnect: true,
    //reconnectTries: 1000000,
    //reconnectInterval: 3000,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};

export default connectMongo;
