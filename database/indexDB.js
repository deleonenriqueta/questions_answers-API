const pool = require('./ETL/pgdb.js');


const pullAllQuestions = (productId, cb) => {
  pool.connect((err) => {
    if (err) {
      console.log('ERROR CONNECTING TO DB');
      cb(err, null);
    } else {
      console.log('SUCCESSFULLY CONNECTED TO DB!');
      pool.query(`SELECT * FROM questions WHERE product_id = ${productId}`, (err, res) => {
        if (err) {
          console.log('Error pulling questions from DB!');
          cb(err, null);
        } else {
          console.log('Successfully pulled data from DB!');
          console.log(res.rows);
          var data = {product_id: productId,
                      results: res.rows}
          cb(null, data);
        }
      })
    }
  })
}

module.exports = {
  pullAllQuestions
}