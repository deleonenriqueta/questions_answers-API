const fs = require('fs');
const format = require('pg-format');
const fastcsv = require('fast-csv');
const pool = require('./pgdb.js');
const {processPhotos} = require('./queries.js');

pool.connect((err) => {
  if (err) {
    console.log('ERROR CONNECTING TO DB: ', err);
  } else {
    console.log('SUCCESSFULLY CONNECTED TO DB!');
    readCSV();
  }
});

const photoQuery = (answerId, urlArr, cb) => {
  var photos = JSON.stringify(urlArr);
  var query = `UPDATE answers SET photos = '${photos}' WHERE id = '${answerId}'`;
  cb(null, query);
}

const insertPhotos = (answerId, urlArr, cb) => {
  var photos = JSON.stringify(urlArr);
  // console.log(urlArr);
  pool.query(`UPDATE answers SET photos = '${photos}' WHERE id = '${answerId}'`, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, res);
    }
  })
}

const readCSV = () => {
  var currentId;
  var counter = 0;
  var urlArr = [];
  var query = {};
  var answer_id;
  var stream = fs.createReadStream('../data/answers_photos.csv');
  var csvStream = fastcsv
    .parse()
    .on('data', (data) => {
      csvStream.pause();
      if (counter !== 0) {
        if (currentId === undefined) {
          currentId = data[1];
        }
        var id          = Number(data[0]);
        var answer_id   = Number(data[1]);
        var url         = data[2];
        if (currentId === id) {
          urlArr.push(url);
        } else {
          insertPhotos(currentId, urlArr, (err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log('Completed insert for answer_id: ', currentId);
              currentId = id;
              urlArr = [];
              urlArr.push(url);
            }
          })
        }
      }
      counter++;
      csvStream.resume();
    })
    .on('end', () => {
      insertPhotos(currentId, urlArr, (err, res) => {
        console.log('Completed insert for answer_id: ', currentId);
      });
      console.log('Job is done!');
      return;
    })
    .on('error', (err) => {
      console.log(err);
    });
  stream.pipe(csvStream);
}