const dbQueries = require('./database/indexDB.js');
const express = require('express');
const app = express();


// app.post('/test', (req, res) => {
//   res.sendStatus(200);
// });

app.get('/qa/questions', (req, res) => {
  var finalQuestions = [];
  dbQueries.pullAllQuestions(req.query.product_id, (err, result) => {
    var questions = result.results;
    if (err) {
      res.send({err});
    } else {
      let applyAnswers = async (questions) => {
      }


      dbQueries.pullAllAnswers(questions, (err, result) => {
        if (err) {
          throw err;
        } else {
          res.send(result);
        }
      })
    }
    //   for (var question of result.results) {
    //   dbQueries.pullAllAnswers(question.question_id, (err, result) => {
    //     if (err) {
    //       throw err;
    //     } else {
    //       console.log(result.answers);
    //       question.answers = result.answers;
    //       promises.push(Promise(question));
    //     }
    //   });
    // }
    // result = JSON.stringify(result);
    // res.send(result);
  })
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  var questionId = req.params.question_id;
  dbQueries.pullAllAnswers(questionId, (err, result) => {
    if (err) {
      res.send({err});
    } else {
      console.log(result);
      result = JSON.stringify(result);
      res.send(result);
    }
  })
});

app.post('/qa/questions', (req, res) => {
  var questionParams = req.query;
  res.send({});
});



/**
 * BELOW IS THE WORK TO BE COMPLETED IF TIME ALLOWS
 */

// app.post('/answers', (req, res) => {
//   res.send({});
// });

// app.patch('/reportAnswer', (req, res) => {
//   res.send({});
// });

// app.patch('/reportQuestion', (req, res) => {
//   res.send({});
// });


module.exports = app;