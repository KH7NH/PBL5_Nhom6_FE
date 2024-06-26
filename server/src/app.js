const express = require('express');
const app = express();
const routes = require('./routes');
const { errorMiddleware } = require('./middleware/error.middleware');
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const cors = require('cors');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const fs = require('fs');

//user middleware
app.use(helmet())
app.use(morgan('combined'))
// compress responses
app.use(compression())
// enable cors
app.use(cors())

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// add body-parser
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// app.use('/uploads', express.static('uploads'));
app.get('/uploads/:name', (req, res) => {
  // Get the image file
  const imageFile = fs.readFileSync(`uploads/${req.params.name}`);

  const base64Image = new Buffer.from(imageFile).toString(
    "base64"
  );
  res.send("data:image/jpeg;base64," + base64Image);
});
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