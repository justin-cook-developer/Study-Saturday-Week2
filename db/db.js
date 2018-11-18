const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/saturday2');

module.exports = db;
