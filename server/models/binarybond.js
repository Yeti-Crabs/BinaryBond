const { Pool } = require('pg');

// URI to postgres database
const PG_URI =
  'postgres://iuwfjakb:22lYBtzsYeOOP6KGX5mWcccaB3rtF6ZC@kashin.db.elephantsql.com/iuwfjakb';

//INSERT INTO users (firstname, lastname, bio, subject, email, password, skilllevel) VALUES ('Tom', 'Nguyen', 'Test', 'Javascript', 'a@a', '1234', '5')

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
