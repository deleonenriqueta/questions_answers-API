const pool = require('./ETL/pgdb.js');

const pullAllQuestions = (productId, cb) => {
  pool.query(`SELECT  question_id,
                      question_body,
                      question_date,
                      asker_name,
                      question_helpfulness,
                      reported
              FROM questions
              WHERE product_id = ${productId} AND reported = 'false'`, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      var data = {
        product_id: productId,
        results: res.rows
      }
      cb(null, data);
    }
  })
}

const pullAllAnswers = (questionId) => {
    pool.query(`SELECT *
    FROM answers
    WHERE question_id = ${questionId} AND reported = 'false'`, (err, res) => {
      if (err) {
         throw err;
      } else {
        var data = res.rows;
        return {data}
      }
    })
  }

module.exports = {
  pullAllQuestions,
  pullAllAnswers
}