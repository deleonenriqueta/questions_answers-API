const pool = require('./ETL/pgdb.js');


const pullAllQuestions = (productId, cb) => {
  pool.connect((err) => {
    if (err) {
      // console.log('ERROR CONNECTING TO DB');
      cb(err, null);
    } else {
      // console.log('SUCCESSFULLY CONNECTED TO DB!');
      pool.query(`SELECT question_id, question_body, question_date, asker_name, question_helpfulness, reported FROM questions WHERE product_id = ${productId} AND reported = 'false'`, (err, res) => {
        if (err) {
          // console.log('Error pulling questions from DB!');
          cb(err, null);
        } else {
          // console.log('Successfully pulled data from DB!');
          var data = {product_id: productId,
                      results: res.rows}
          cb(null, data);
        }
      })
    }
  })
}

const pullAllAnswers = (questionId, cb) => {
  pool.connect((err) => {
    if (err) {
      console.log('Error connecting to DB');
      cb(err, null);
    } else {
      console.log('SUCCESSFULLY CONNECTED TO DB!');
      pool.query(`SELECT * FROM answers WHERE question_id = ${questionId} AND reported = 'false'`, (err, res) => {
        if (err) {
          console.log('Error pulling Answers from DB');
          cb(err, null);
        } else {
          console.log('Successfully pulled Answers from DB');
          var data = {answers: res.rows};
          cb(null, {answers: data});
        }
      })
    }
  })
}

module.exports = {
  pullAllQuestions,
  pullAllAnswers
}