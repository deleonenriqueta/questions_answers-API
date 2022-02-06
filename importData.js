// const fs = require('fs');
// const parse = require('csv-parse');
// const fastcsv = require("fast-csv");
// const Pool = require('pg').Pool;
// const pg = require('pg');

// const pool = new Pool({
//   user: 'root',
//   database: 'sdc',
//   table: 'questions',
//   port: 5432
// });

// // const client = new pg.Client(config);

// client.connect(err => {
//   if (err) {
//     console.log('Error connection to db!');
//     throw err;
//   } else {
//     console.log('Successfully connected to db!');
//     uploadData();
//   }
// });

// const uploadData = () => {
//   let newRow;
//   let stream = fs.createReadStream('./data/questions.csv');
//   let csvStream = fastcsv
//   .parse()
//   .on('data', (row) => {
//     if (row[0] !== 'id') {
//       let id            = Number(row[0]);
//       let product_id    = Number(row[1]);
//       let body          = row[2];
//       let date_written  = row[3];
//       let asker_name    = row[4];
//       let asker_email   = row[5];
//       let reported      = Number(row[6]);
//       let helpful       = Number(row[7]);

//       const dbQuery = `INSERT INTO questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
//                     VALUES ( ${id}, ${product_id}, ${body}, ${date_written}, ${asker_name}, ${asker_email}, ${reported}, ${helpful})`;

//       client.query(err, clientdbQuery)
//       .then(() => {
//         console.log('Inserting row into database');
//         client.end(console.log('Closed client connection!'));
//       })
//       .catch(err => console.log(err))
//       .then(() => {
//         console.log('Finished execution, exiting now');
//         process.exit();
//       });
//     }
//   })
//   .on('end', () => {
//     console.log('ALL DONE!');
//   });
//     stream.pipe(csvStream);
// }

