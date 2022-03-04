const pool = require('./ETL/pgdb.js');

const pullAllQuestions = async (productId) => {
  try {
    const questions = await pool.query(`SELECT  question_id, question_body, question_date,
                                                asker_name, question_helpfulness, reported
                                        FROM    questions
                                        WHERE   product_id = ${productId}
                                        AND     reported = 'false'`);
    return questions.rows;
  } catch (error) {
    throw error;
  }
}

const pullAllAnswers = async (question) => {
  try {
    const text = `SELECT  id, body, date, answerer_name, helpfulness
                  FROM answers WHERE question_id = ($1) AND reported = 'false'`;
    const values = [question.question_id];
    const answers = await pool.query(text, values);
    const transformedAnswers = await transformAnswers(answers.rows);
    const finalAnswers = await pullAllPhotos(answers.rows);
    question.answers = transformedAnswers;
    return question;
  } catch (error) {
    throw error;
  }
}

const transformAnswers = async (answerObj) => {
  var newAnswerObj = {};
  for (var answer of answerObj) {
    newAnswerObj[answer.id] = answer;
  }
  return newAnswerObj;
}

const pullAllPhotos = async (answers) => {
  try {
    const addPhotos = async (answers) => {
      let promises = [];
      for (let index = 0; index < answers.length; index ++) {
        promises.push(await photosQuery(answers[index]));
      }
      Promise.all(promises)
      .then((values) => {
        return values;
      })
    }
    const result = await addPhotos(answers);
    return result;
  } catch (error) {
    throw error;
  }
}

const photosQuery = async (answer) => {
  try {
    const photos = await pool.query(`SELECT id, url
                                     FROM answers_photos
                                     WHERE answer_id = ${answer.id}`);
    answer.photos = photos.rows;
    return answer;
  } catch (error) {
    throw error;
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

module.exports = {
  pullAllQuestions,
  pullAllAnswers,
  insertQuestion
}