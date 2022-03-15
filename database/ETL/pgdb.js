const pg = require('pg');
require('dotenv').config();

var config = {
  user: 'root',
  database: 'sdc',
  host: process.env.SDC_IP,
  password: process.env.SDC_PASS,
  port: 5432
}

const pool = new pg.Pool(config);

module.exports.pool = pool;

module.exports.query = (text, values, callback) => {
  return pool.query(text, values, callback);
}

module.exports.connect = (callback) => {
  return pool.connect(callback);
}