const processQuestions = (data) => {
  let id              = Number(data[0]);
  let product_id      = Number(data[1]);
  let body            = data[2];
  let date_written    = data[3];
  let asker_name      = data[4];
  let asker_email     = data[5];
  let reported        = Number(data[6]);
  let helpful         = Number(data[7]);

  var text = 'INSERT INTO questions (question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) VALUES ';
  var values = [id, product_id, body, date_written, asker_name, asker_email, reported, helpful];

  return {text, values};
}

const processAnswers = (data) => {
  let id              = Number(data[0]);
  let question_id     = Number(data[1]);
  let body            = data[2];
  let date_written    = data[3];
  let answerer_name   = data[4];
  let answerer_email  = data[5];
  let reported        = Number(data[6]);
  let helpful         = Number(data[7]);

  var text = 'INSERT INTO answers (id, question_id, body, date, answerer_name, answerer_email, reported, helpfulness) VALUES ';
  var values = [id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful];

  return {text, values};
}

const processPhotos = (data) => {
  let photo_id    = Number(data[0]);
  let answer_id   = Number(data[1]);
  let url         = data[2];

  var text = 'INSERT INTO answers_photos (photo_id, answer_id, url) VALUES ';
  var values = [photo_id, answer_id, url];

  return {text, values};
}

module.exports = {
  processQuestions,
  processAnswers,
  processPhotos
}
