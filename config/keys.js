const namepass = require("./namepass");
module.exports = {
  mongoURI: `mongodb://${namepass.name}:${
    namepass.pass
  }123@ds121341.mlab.com:21341/devcon`,
  secretOrKey: "secret"
};
