const dbQueries = require('./database/indexDB.js');
const express = require('express');
const client = require('./redis.js');
const app = express();


(async () => {
  console.log('connecting client')
  await client.connect();
})();

client.on('error', (err) => console.log('Redis Client Error: ', err));

const cache = async (req, res, next) => {
  try {
    const productID = req.query.product_id;
    console.log('Here');
    const queryResult = await client.get(req.query.product_id);
    if (queryResult) {
      res.send(queryResult);
    } else {
      next();
    }
  } catch (err) {
    res.send({ERROR: err});
  }

}

app.use(express.json());

app.use('/', express.static('files'));

app.get('/qa/questions', cache, async (req, res) => {
  try {
    const allData = await dbQueries.allData(Number(req.query.product_id));
    await client.set(req.query.product_id, JSON.stringify(allData));
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
  }
});

// app.get('qa/questions/cachePrep', cache, async, (req, res) => {
//   try {
//     var key = Math.floor(Math.random()*1000011);
//     key = key.toString();

//   } else (err) {
//     res.status(400).send(err);
//   }
// })

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