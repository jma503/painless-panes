/**
 * Establish connection to Postgres DB via PG pool
 */
require("dotenv").config();

const pg = require("pg");

let poolConfig;

if (process.env.DATABASE_URL) {
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  poolConfig = {
    host: "localhost",
    port: 5432,
    database: "painless_panes",
  };
}

if (process.env.DATABASE_USER) {
  poolConfig.user = process.env.DATABASE_USER;
}

if (process.env.DATABASE_PASSWORD) {
  poolConfig.password = process.env.DATABASE_PASSWORD;
}

const pool = new pg.Pool(poolConfig);

// pool
//   .query('SELECT * FROM "user";')
//   .then((result) => result.rows)
//   .then(console.log)
//   .catch(console.error);

module.exports = pool;
