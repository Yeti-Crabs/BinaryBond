const { Pool } = require('pg');

const PG_URI = 'postgres://xaewpvvq:YaKRo1h4ojtfBs9pXEj8WwaCk3j-5hvv@rajje.db.elephantsql.com/xaewpvvq';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});
// const fetch = async () => {
//   const response = await pool.query('SELECT * FROM users');
//   console.log(response);
// };
// fetch();
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};