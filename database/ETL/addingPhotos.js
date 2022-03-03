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

const multiInsert = (text, dataArr, counter) => {
  pool.query(format(text + ' %L', dataArr), (err, res) => {
    if (err) {
      console.log('ERROR inserting row into DB: ', err);
    } else {
      console.log('Inserted up to: ', counter);
    }
  });
}

const readCSV = () => {
  var counter = 0;
  var urlArr = [];
  var valuesArr = [];
  var photoObj = {};
  var stream = fs.createReadStream('database/ETL/addingPhotos.js');
  var csvStream = fastcsv
    .parse()
    .on('data', (data) => {
      csvStream.pause();
      if (valuesArr.length === 900) {
        var text = `INSERT INTO answers_photos (photo_id, answer_id, url) VALUES `;
        multiInsert(text, valuesArr, counter, (err, result) => {
          if (err) {
            throw err;
          } else {
            console.log(result);
            valuesArr = [];
          }
        })
      }
      if (counter !== 0) {
        var id          = Number(data[0]);
        var answer_id   = Number(data[1]);
        var url         = data[2];
        valuesArr.push([id, answer_id, url]);
      }

        counter++;
        csvStream.resume();
    })
    .on('end', () => {
      var text = `INSERT INTO answers_photos (photo_id, answer_id, url) VALUES `;
      multiInsert(text, valuesArr, counter, (err, result) => {
        if (err) {
          throw err;
        } else {
          console.log('Job is done!');
        }
      })

    })
    .on('error', (err) => {
      console.log(err);
    });
  stream.pipe(csvStream);
}