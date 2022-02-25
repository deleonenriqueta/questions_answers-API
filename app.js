const dbQueries = require('./database/indexDB.js');
const express = require('express');
const app = express();


// app.post('/test', (req, res) => {
//   res.sendStatus(200);
// });

app.get('/qa/questions', (req, res) => {
  dbQueries.pullAllQuestions(req.query.product_id, (err, result) => {
    if (err) {
      res.send({err});
    } else {
      for (var id of result.results) {
        dbQueries.pullAllAnswers(id.question_id, (err, res) => {
          if (err) {
            res.send({err});
          } else {
            id.answers = res.answers;
          }
        });
      }
      result = JSON.stringify(result);
      res.send(result);
    }
  })
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  var questionId = req.params.question_id;
  dbQueries.pullAllAnswers(questionId, (err, result) => {
    if (err) {
      console.log(err);
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