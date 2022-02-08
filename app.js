const express = require('express');
const app = express()

// app.post('/test', (req, res) => {
//   res.sendStatus(200);
// });

app.post('/answers', (req, res) => {
  res.send({});
});

app.post('/questions', (req, res) => {
  res.send({});
});

app.get('/answers', (req, res) => {
  res.send({});
});

app.get('/questions', (req, res) => {
  // const product_id = req.body;
  // if(!product_id) {
  //   res.sendStatus(400);
  //   return;
  // }
  res.send({results: {a: '123'}});
});

app.patch('/reportAnswer', (req, res) => {
  res.send({});
});

app.patch('/reportQuestion', (req, res) => {
  res.send({});
});


module.exports = app;