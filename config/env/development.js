//development.js

const devConfig = {
  //database
  jwt_key: "myS33!!creeeT",
  jwt_expiration: 360000,
  dbConnectionString: `mongodb://localhost:27017/local`,
  mongoDebug: true,
};

export default devConfig;
