const request = require('supertest');
const app = require('../app.js');

// describe('POST /test', () => {
//   test('should respond with a 200 status code', async () => {
//     const response = await request(app).post('/test').send({
//       productId: 12345
//     })
//     expect(response.statusCode).toBe(200);
//   })
// })

describe('GET /qa/questions', () => {
  describe('a product id is provided', () => {
    // // should pull the questions from the db
    // // should respond with JSON object containing the list of questions
    test('should respond with a 200 status code', async () => {
      const response = await request(app).get('/qa/questions').send({
        product_id: 12345
      })
      expect(response.statusCode).toBe(200);
    });
    test('should specify JSON in the content type header', async () => {
      const response = await request(app).get('/qa/questions').send({
        product_id: 12345,
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
    test('response should have product_id', async () => {
      const response = await request(app).get('/qa/questions').send({
        product_id: 12345
      })
      expect(response.body.results).toBeDefined();
    });
    xtest('valid product_id not provided', async () => {
      const response = await request(app).get('/questions').send({
        questionId: 12345
      })
      expect(response.statusCode).toBe(400);
    });
  })

  describe('an invalid user id is provided', () => {
    // should respond with a code of 400 to indicate user error
  })
})

// describe('GET /answers', () => {
//   describe('a valid user id is provided', () => {
//     // // should pull the answers from the db
//     // // should respond with JSON object containing the list of answers
//     test('should respond with a 200 status code', async () => {
//       const response = await request(app).get('/answers').send({
//         questionId: 12345
//       })
//       expect(response.statusCode).toBe(200);
//     })
//     test('should specify JSON in the content type header', async () => {
//       const response = await request(app).get('/answers').send({
//         questionId: 12345,
//       })
//       expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
//     })
//   })

//   describe('an invalid user id is provided', () => {
//     // should respond with a code of 400 to indicate user error
//   })
// })

// describe('POST /questions', () => {
//   describe('a question is provided', () => {
//     // // should save the qustion to the db
//     // // should respond with JSON object containing the user id
//     test('should respond with a 200 status code', async () => {
//       const response = await request(app).post('/questions').send({
//         productId: 12345,
//         body: 'some question',
//         asker_name: 'someone',
//         asker_email: 'first.last@gmail.com'
//       })
//       expect(response.statusCode).toBe(200);
//     })
//     test('should specify JSON in the content type header', async () => {
//       const response = await request(app).post('/questions').send({
//         productId: 12345,
//         body: 'some question',
//         asker_name: 'someone',
//         asker_email: 'first.last@gmail.com'
//       })
//       expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
//     })
//   })

//   describe('when question is missing', () => {
//     // should respond with a code of 400 to indicate user error
//   })
// })

// describe('POST /answers', () => {
//   describe('an answer is provided', () => {
//     // // should save the answer to the db
//     // // should respond with JSON object containing the user id

//     test('should respond with a 200 status code', async () => {
//       const response = await request(app).post('/answers').send({
//         answerId: 12345
//       })
//       expect(response.statusCode).toBe(200);
//     })
//     test('should specify JSON in the content type header', async () => {
//       const response = await request(app).post('/answers').send({
//         answerId: 12345
//       })
//       expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
//     })
//   })

//   describe('when answer is missing', () => {
//     // should respond with a code of 400 to indicate user error
//   })
// })

// describe('PATCH /reportQuestion', () => {
//   describe('a valid question id is provided', () => {
//     // // should update report value in db
//     // // should respond with JSON object containing the list of questions
//     test('should respond with a 200 status code', async () => {
//       const response = await request(app).patch('/reportQuestion').send({
//         questionId: 12345,
//         reported: true
//       })
//       expect(response.statusCode).toBe(200);
//     })
//     test('should specify JSON in the content type header', async () => {
//       const response = await request(app).patch('/reportQuestion').send({
//         questionId: 12345,
//         reported: true
//       })
//       expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
//     })
//   })

//   describe('an invalid question id is provided', () => {
//     // should respond with a code of 400 to indicate user error
//   })
// })

// describe('PATCH /reportAnswer', () => {
//   describe('a valid answer id is provided', () => {
//     // // should update report value in db
//     // // should respond with JSON object containing the list of questions
//     test('should respond with a 200 status code', async () => {
//       const response = await request(app).patch('/reportAnswer').send({
//         answerId: 12345,
//         reported: true
//       })
//       expect(response.statusCode).toBe(200);
//     })
//     test('should specify JSON in the content type header', async () => {
//       const response = await request(app).patch('/reportAnswer').send({
//         questionId: 12345,
//         reported: true
//       })
//       expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
//     })
//   })

//   describe('an invalid question id is provided', () => {
//     // should respond with a code of 400 to indicate user error
//   })
// })