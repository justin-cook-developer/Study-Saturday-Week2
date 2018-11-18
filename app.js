const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require('./db/db');

const fillDb = require('./db/index');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  try {
    res.redirect('/student');
  } catch(e) { next(e) }
});

app.use('/student', require('./routes/studentRoutes'));

app.use('/test', require('./routes/testRoutes'));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

if (require.main === module) {
  //will only run when run with npm start and not with npm test to avoid db syncing in multiple threads when running tests
  db.sync({ logging: console.log })
    .then(() =>
      app.listen(3000, function() {
        console.log('Server is listening on port 3000!');
      })
    )
    .catch(console.error);
}

module.exports = app;
