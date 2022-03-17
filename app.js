const dbQueries = require('./database/indexDB.js');
const express = require('express');
const app = express();


// app.post('/test', (req, res) => {
//   res.sendStatus(200);
// });

app.use(express.json());

app.use('/', express.static('files'));

app.get('/qa/questions', async (req, res) => {
  try {
    const allData = await dbQueries.allData(Number(req.query.product_id));
    res.send(allData);
  } catch (error) {
    res.send({ERROR: error});
  }
});

app.post('/qa/questions', async (req, res) => {
  try {
    const hasAllParams = await dbQueries.paramsCheck(req.query);
    if (!hasAllParams){
      res.sendStatus(400);
      return;
    } else {
      const result = await dbQueries.insertQuestion(req.query);
      return;
    }
  } catch (error) {
    res.send({ERROR: error});
    return;
  }
});

// app.get('/qa/questions/:question_id/answers', (req, res) => {
//   var questionId = req.params.question_id;
//   dbQueries.pullAllAnswers(questionId, (err, result) => {
//     if (err) {
//       res.send({err});
//     } else {
//       console.log(result);
//       result = JSON.stringify(result);
//       res.send(result);
//     }
//   })
// });

// app.get('/test', async (req, res) => {
//   try {
//     let productId = req.query.question_id;
//     const questions = await dbQueries.pullAllAnswers(productId);
//     const data = await {result: questions};
//     res.send(data);
//   } catch (err) {
//     res.send({error: err})
//   }
// })

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