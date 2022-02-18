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

// const checkPhotos = (answerId, cb) => {
//   console.log('checking for photos...');
//   pool.query(`SELECT url FROM answers_photos WHERE answer_id = ${answerId}`, (err, res) => {
//     if (err) {
//       console.log('ERROR finding photos');
//       cb(err, null);
//     } else {
//       // console.log('RES: ', res.rows);
//       cb(null, res.rows);
//     }
//   });
// }

const insertPhotos = (urls, answerId, cb) => {
  console.log('inserting photos into answers table...')
  console.log(answerId);
  console.log(urls);
  var photos = JSON.stringify(urls);
  console.log(`INSERT INTO answers (photos) VALUES (${photos}) WHERE id = ${answerId}`);
  // pool.query(`INSERT INTO answers (photos) VALUES ('${urls}') WHERE id = ${answerId}`, (err, res) => {
  //   if (err) {
  //     console.log('ERROR pulling phoros from DB: ', err);
  //     cb(err, null);
  //   } else {
  //     cb(null, 'SUCCESSFULLY INSERTED PHOTOS!');
  //   }
  // });
}

const readCSV = () => {
  var counter = 0;
  var dataArr = [];
  var query = {};
  var answer_id,
      photos;
  var stream = fs.createReadStream('../data/answers_photos.csv');
  var csvStream = fastcsv
    .parse()
    .on('data', (data) => {
      csvStream.pause();
      answer_id = data[1];
      urls = data[2];
      insertPhotos(urls, answer_id, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      });
      counter ++;
      csvStream.resume();
    })
    .on('end', () => {
      // multiInsert(query.text, dataArr, counter);
      console.log('Job is done!');
      return;
    })
    .on('error', (err) => {
      console.log(err);
    });
  stream.pipe(csvStream);
}