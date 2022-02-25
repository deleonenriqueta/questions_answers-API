DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

\connect test;

CREATE TABLE questions (
  id            INTEGER   PRIMARY KEY NOT NULL,
  product_id    INTEGER   NOT NULL,
  body          TEXT      NOT NULL,
  asker_date    TEXT      NOT NULL,
  asker_name    TEXT      NOT NULL,
  asker_email   TEXT      NOT NULL,
  reported      BOOLEAN   NOT NULL,
  helpful       INTEGER   NOT NULL
);