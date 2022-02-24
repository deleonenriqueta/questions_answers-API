DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

\connect sdc;

CREATE TABLE questions (
  question_id           INTEGER   NOT NULL,
  product_id            INTEGER   NOT NULL,
  question_body         TEXT      NOT NULL,
  question_date         TEXT      NOT NULL,
  asker_name            TEXT      NOT NULL,
  question_helpfulness  INTEGER   NOT NULL,
  asker_email           TEXT      NOT NULL,
  reported              BOOLEAN   NOT NULL
);

CREATE TABLE answers_photos (
  id        INTEGER   NOT NULL,
  answer_id INTEGER   NOT NULL,
  url       TEXT      NOT NULL
);

CREATE TABLE answers (
  id                INTEGER   NOT NULL,
  question_id       INTEGER   NOT NULL,
  body              TEXT      NOT NULL,
  date              TEXT      NOT NULL,
  answerer_name     TEXT      NOT NULL,
  helpfulness       INTEGER   NOT NULL,
  answerer_email    TEXT      NOT NULL,
  reported          BOOLEAN   NOT NULL
);