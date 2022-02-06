const fs = require('fs');
const fastcsv = require('fast-csv');
const pool = require('./pgdb');

pool.connect((err) => {
  if (err) {
    console.log('ERROR CONNECTING TO DB: ', err);
  } else {
    console.log('SUCCESSFULLY CONNECTED TO DB!');
    readCSV();
  }
});

const processQuestions = (data) => {
  let id            = Number(data[0]);
  let product_id    = Number(data[1]);
  let body          = data[2];
  let asker_date    = data[3];
  let asker_name    = data[4];
  let asker_email   = data[5];
  let reported      = Boolean(data[6]);
  let helpful       = Number(data[7]);

  var text = 'INSERT INTO questions VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  var values = [id, product_id, body, asker_date, asker_name, asker_email, reported, helpful];

  return {text, values};
}

const processAnswers = (data) => {
  let id              = Number(data[0]);
  let question_id     = Number(data[1]);
  let body            = data[2];
  let date_written    = data[3];
  let answerer_name   = data[4];
  let answerer_email  = data[5];
  let reported        = Boolean(data[6]);
  let helpful         = Number(data[7]);

  var text = 'INSERT INTO answers VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  var values = [id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful];

  return {text, values};
}

const processPhotos = (data) => {
  let id          = Number(data[0]);
  let answer_id   = Number(data[1]);
  let url         = data[2];

  var text = 'INSERT INTO answers_photos VALUES ($1, $2, $3)';
  var values = [id, answer_id, url];

  return {text, values};
}

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
