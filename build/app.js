"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _routes = _interopRequireDefault(require("./routes"));

var _mongoconnect = _interopRequireDefault(require("./config/mongoconnect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var isProduction = process.env.NODE_ENV === "production";
app.use(_bodyParser["default"].json());
app.use((0, _morgan["default"])("dev"));
(0, _mongoconnect["default"])();
app.use("/", _routes["default"]);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server is running on product => ".concat(isProduction));
  console.log("Server is running on port: ".concat(PORT));
});