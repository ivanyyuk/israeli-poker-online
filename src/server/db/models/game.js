'use strict'

const db = require('../db');
const Sequelize = require('Sequelize');

module.exports = db.define('game', {
  currentRow: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})
