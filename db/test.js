const Sequelize = require('sequelize');
const db = require('./db');

const Test = db.define('test', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  score: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  }
});

module.exports = Test;
