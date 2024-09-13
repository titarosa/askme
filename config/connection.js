const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Use DATABASE_URL for Render PostgreSQL connection
sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

module.exports = sequelize;  



