const fs = require('fs');
const fastcsv = require('fast-csv');
const pool = require('./pgdb');
import { processQuestions, processAnswers, processPhotos} from ('./queries.js');

pool.connect((err) => {
  if (err) {
    console.log('ERROR CONNECTING TO DB: ', err);
  } else {
    console.log('SUCCESSFULLY CONNECTED TO DB!');
    readCSV();
  }
});

const readCSV = () => {
  var counter = 0;
  var stream = fs.createReadStream('data/answers_photos.csv');
  var csvStream = fastcsv
    .parse()
    .on('data', (data) => {
      csvStream.pause();
      if(counter !== 0) {
        var query = processPhotos(data);
        pool.query(query.text, query.values, (err, res) => {
          if (err) {
            console.log('ERROR inserting row into DB: ', err);
          } else {
            console.log('ADDED: ', query.values[0]);
          }
        });
      }
      counter ++;
      csvStream.resume();
    })
    .on('end', () => {
      console.log('Job is done!');
    })
    .on('error', (err) => {
      console.log(err);
    });
  stream.pipe(csvStream);
}
