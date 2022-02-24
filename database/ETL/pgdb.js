const pg = require('pg');

var config = {
  user: 'root',
  database: 'sdc',
  host: 'localhost',
  port: 5432
  // ,max: 10, idleTimeoutMillis: 30000
}

const pool = new pg.Pool(config);

module.exports.pool = pool;

module.exports.query = (text, values, callback) => {
  return pool.query(text, values, callback);
}

module.exports.connect = (callback) => {
  return pool.connect(callback);
}