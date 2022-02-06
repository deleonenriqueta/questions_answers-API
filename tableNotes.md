1. answers_photos.csv
  - id
  - answer_id
  - url

2. answers.csv
  - id
  - question_id
  - body
  - date_written
  - answerer_name
  - answerer_email
  - reported
  - helpful

3. quesions.csv
  - id
  - product_id
  - body
  - date_written
  - asker_name
  - asker_email
  - reported
  - helpful

4. questions GET Req
  - product_id: #,
  - results: [{
    - question_id: #,
    - question_body: str,
    - question_date: str,
    - asker_name: str,
    - question_helpfulness,
    - reported: boolean,
    - answers: {
      - id#: {
        - id: #,
        - body: str,
        - date: str,
        - answerer_name: str,
        - helpfulness: #,
        - photos: [{
          - id: #,
          - url: str
        }]
      }
    }
  }]
