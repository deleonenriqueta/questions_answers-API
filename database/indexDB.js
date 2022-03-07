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
                  FROM answers WHERE question_id = ${question.question_id} AND reported = 'false'`;
    const text2 = `SELECT id, answer_id, url
                  FROM answers_photos WHERE question_id = ${question.question_id}`;
    const answers = await pool.query(text);
    const photos = await pool.query(text2);
    if (answers.rows.length === 0) {
      question.answers = {};
      return question;
    } else {
      if (photos.rows.length === 0) {
        question.answers = {};
        for (var answer of answers.rows) {
          answer.photos = [];
          question.answers[answer.id] = answer;
        }
        return question;
      } else {
        const newAnswers = updateAnswers(answers.rows, photos.rows);
        const newQuestion = updateQuestion(question, newAnswers);
        return newQuestion;
      }
    }
    // const transformedAnswers = await transformAnswers(answers.rows);
    // const finalAnswers = await pullAllPhotos(answers.rows);
    // question.answers = transformedAnswers;
    // return question;
  } catch (error) {
    throw error;
  }
}

const updateAnswers = (answers, urls) => {
  var urlsAndId;
  var found;
  var counter;

  for (var url of urls) {
    urlAnsId = url.answer_id;
    found = false;
    counter = 0;
    while (!found) {
      if (urlAnsId === answers[counter].id) {
        if (answers[counter].photos) {
          delete url.answer_id;
          answers[counter].photos.push(url);
        } else {
          answers[counter].photos = [];
          delete url.answer_id;
          answers[counter].photos.push(url);
        }
        found = true;
      }
      counter ++;
    }
  }
  return answers;
}

const updateQuestion = (question, answers) => {
  question.answers = {};
  for (var answer of answers) {
    question.answers[answer.id] = answer;
  }
  return question;
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
  insertQuestion,
  paramsCheck
}