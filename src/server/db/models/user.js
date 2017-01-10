'use strict'

const db = require('../db');
const Sequelize = require('sequelize');

module.exports = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

