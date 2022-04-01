import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mainRouter from "./routes";
import connectMongo from "./config/mongoconnect";
import path from "path";

const app = express();

const isProduction = process.env.NODE_ENV === "production";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

connectMongo();

app.use("/", mainRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on product => ${isProduction}`);
  console.log(`Server is running on port: ${PORT}`);
});
