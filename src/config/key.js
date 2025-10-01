
// require("dotenv").config({ path: __dirname + "/../../../.env" });
// require("dotenv").config({ path:"./.env" });
const config = require("dotenv")
.config();



module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};
