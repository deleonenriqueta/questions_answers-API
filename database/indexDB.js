const pool = require('./ETL/pgdb.js');

const paramsCheck = (params) => {
  try {
    const paramKeys = ['body', 'name', 'email', 'product_id'];
    for (var key of paramKeys) {
      if (!params.includes(key)) {
        return false;
      }
    }
    return true;
  } catch (error) {

  }
}

const insertQuestion = async (params) => {
  try {
    const question_id = Number((await pool.query('SELECT COUNT(*) FROM questions')).rows[0].count) + 1;
    const question_date = new Date();
    const result = await pool.query(`INSERT INTO questions (product_id, question_id, question_body, question_date, asker_name, question_helpfulness, reported)
                                     VALUES (${params.product_id}, ${question_id}, '${params.body}', '${question_date}', '${params.name}', 0, false)`);
    return result.rows;
  } catch (error) {
    throw error;
  }
}
const allData = async (product_id) => {
  try {
    var questionID;
    var answersObj = {};
    var questionsObj = {};
    var newAnswers = [];
    var newQuestions = [];

    const qData = await pool.query(`SELECT product_id, question_id, question_body, question_date, asker_name, question_helpfulness, reported
                                  FROM questions
                                  WHERE questions.product_id=${product_id} AND questions.reported=false ORDER BY questions.product_id`);
    const aData = await pool.query(`SELECT question_id, id, body, date, answerer_name, helpfulness
                                  FROM answers
                                  WHERE answers.product_id=${product_id} AND answers.reported=false ORDER BY answers.product_id`);
    const pData = await pool.query(`SELECT id, answer_id, url, question_id FROM answers_photos
                                  WHERE answers_photos.product_id=${product_id} ORDER BY answers_photos.product_id`);
    for (var answer of aData.rows) {
      answer.photos = [];
      answersObj[answer.id] = answer;
    }
    for (var question of qData.rows) {
      question.answers = {};
      delete question.product_id;
      questionsObj[question.question_id] = question;
    }
    for (var photo of pData.rows) {
      answersObj[photo.answer_id].photos.push({
        id: photo.id,
        url: photo.url
      })
    }
    newAnswers = Object.values(answersObj);
    for (var answer of newAnswers) {
      questionID = answer.question_id;
      delete answer.question_id;
      questionsObj[questionID].answers[answer.id] = answer;
    }
    newQuestions = Object.values(questionsObj);
    var result = {
      product_id: product_id,
      results: newQuestions
    }
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  insertQuestion,
  paramsCheck,
  allData,
}