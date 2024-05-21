const express = require('express');
const app = express();
const routes = require('./routes');
const { errorMiddleware } = require('./middleware/error.middleware');
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const cors = require('cors');

//user middleware
app.use(helmet())
app.use(morgan('combined'))
// compress responses
app.use(compression())
// enable cors
app.use(cors())

// add body-parser
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// Routes
app.use('/api/v1', routes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use(errorMiddleware);

module.exports = app;