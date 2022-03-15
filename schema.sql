DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc WITH OWNER = root;

\connect sdc;

CREATE TABLE questions (
  product_id            INTEGER             NOT NULL,
  question_id           INTEGER PRIMARY KEY NOT NULL,
  question_body         TEXT                NOT NULL,
  question_date         TEXT                NOT NULL,
  asker_name            TEXT                NOT NULL,
  question_helpfulness  INTEGER             NOT NULL,
  reported              BOOLEAN             NOT NULL
);

CREATE TABLE answers (
  question_id       INTEGER             NOT NULL,
  id                INTEGER PRIMARY KEY NOT NULL,
  body              TEXT                NOT NULL,
  date              TEXT                NOT NULL,
  answerer_name     TEXT                NOT NULL,
  helpfulness       INTEGER             NOT NULL,
  reported          BOOLEAN             NOT NULL
);

CREATE TABLE answers_photos (
  photo_id           INTEGER PRIMARY KEY NOT NULL,
  answer_id          INTEGER             NOT NULL,
  url                TEXT                NOT NULL
);

CREATE TABLE photos (
  id          SERIAL              NOT NULL,
  answer_id   INTEGER PRIMARY KEY NOT NULL,
  photos      JSONB               NOT NULL
);