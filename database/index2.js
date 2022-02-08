const pool = require('../pgdb');

pool.connect((err) => {
  if (err) {
    console.log('Failed to connect to the DB: ', err);
  } else {
    console.log('Successfully connected to the DB!');
    pullQuestions();
    // pullAnswers();
  }
});

const pullPhotos = (question, cb) => {
  var answers = question.answers;
  console.log(answers);
  for (var answer of answers) {
    pool.query(`SELECT * FROM answers_photos WHERE answer_id = '${answer.id}`, (err, res) => {
      if (err) {
        console.log('Could not pull photos for: ', answer.id)
        answer.photos = [];
      } else {
        console.log('Successfully pulled photos for: ', answer.id);
        console.log(res);
      }
    })
  }
}

const pullAnswers = (question, cb) => {
  var questionId = question.id;
  // var questionId = 227309;

  pool.query(`SELECT * FROM answers WHERE question_id = '${questionId}'`, (err, res) => {
    if (err) {
      console.log('Could not pull answers for: ', questionId);
      // cb(err, null);
    } else {
      console.log('Successfully pulled answers for: ', questionId);
      var answers = res.rows;
      question.answers = answers;
      pullPhotos(question, (err, res) => {
        if (err) {
          console.log('Could not pull photos for: ', question.id);
        } else {
          console.log(res);
        }
      })
    }
  })
}

const pullQuestions = (productId) => {
  var id = productId || 3;

  pool.query(`SELECT * FROM questions WHERE product_id = '${id}'`, (err, res) => {
    if (err) {
      console.log('Could not pull questions for: ', id);
      // cb(err, null);
    } else {
      console.log('Successfully pulled questions for :', id);
      // cb(null, res);
      // console.log(res.rows);
      var questions = res.rows;
      for (var question of questions) {
        pullAnswers(question, (err, res) => {
          if (err) {
            console.log('Could not add answers to: ', question.id)
          } else {
            // console.log(res);
          }
        })
      }
    }
  })
}