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

const photosInsert = (text, dataArr) => {
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
  var dataArr = [];
  var query = {};
  var stream = fs.createReadStream('../data/answers_photos.csv');
  var csvStream = fastcsv
    .parse()
    .on('data', (data) => {
      csvStream.pause();
      if(counter !== 0 ) {
        query = processPhotos(data);
        dataArr.push(query.values);
        if (dataArr.length === 100 ) {
          multiInsert(query.text, dataArr, counter);
          dataArr = [];
        }
      }
      counter ++;
      csvStream.resume();
    })
    .on('end', () => {
      multiInsert(query.text, dataArr, counter);
      console.log('Job is done!');
      return;
    })
    .on('error', (err) => {
      console.log(err);
    });
  stream.pipe(csvStream);
}
