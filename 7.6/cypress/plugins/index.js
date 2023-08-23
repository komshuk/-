module.exports = (on, config) => {
    config.env.configurations = require("../../cypress.env.json");
    return config;
  };