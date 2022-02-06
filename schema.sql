DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

\connect sdc;

CREATE TABLE questions (
  id            INTEGER   NOT NULL,
  product_id    INTEGER   NOT NULL,
  body          TEXT      NOT NULL,
  date_written  TEXT      NOT NULL,
  asker_name    TEXT      NOT NULL,
  asker_email   TEXT      NOT NULL,
  reported      BOOLEAN   NOT NULL,
  helpful       INTEGER   NOT NULL
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
  date_written      TEXT      NOT NULL,
  answerer_name     TEXT      NOT NULL,
  answerer_email    TEXT      NOT NULL,
  reported          BOOLEAN   NOT NULL,
  helpful           INTEGER   NOT NULL
);