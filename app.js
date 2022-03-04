const dbQueries = require('./database/indexDB.js');
const express = require('express');
const app = express();


// app.post('/test', (req, res) => {
//   res.sendStatus(200);
// });

app.get('/qa/questions', async (req, res) => {
  try {
    const questions = await dbQueries.pullAllQuestions(req.query.product_id);
    const questionsAndAnswers = async (questions) => {
      let promises = [];
      for (let index = 0; index < questions.length; index ++) {
        promises.push(await dbQueries.pullAllAnswers(questions[index]));
      }
      Promise.all(promises)
      .then((values) => {
        res.send({product_id: req.query.product_id,
                  results: values})
      })
    }
    questionsAndAnswers(questions);
  } catch (error) {
    res.send({ERROR: error});
  }
});

app.post('/qa/questions', async (req, res) => {
  try {
    const result = await dbQueries.insertQuestion(req.query);
    res.sendStatus(201);
  } catch (error) {
    res.send({ERROR: error});
  }
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

app.get('/test', async (req, res) => {
  try {
    let productId = req.query.question_id;
    const questions = await dbQueries.pullAllAnswers(productId);
    const data = await {result: questions};
    res.send(data);
  } catch (err) {
    res.send({error: err})
  }
})

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