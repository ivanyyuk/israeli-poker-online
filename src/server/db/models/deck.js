'use strict'

const db = require('../db');
const Sequelize = require('sequelize');

module.exports = db.define('deck', {
  cards: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false
  },
  index: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
  })
