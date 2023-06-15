const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

const loginRouter = require('./routes/login.js');
const homepageRouter = require('./routes/homepage');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});

// routers for login page and homepage
app.use('/api', loginRouter, homepageRouter);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
