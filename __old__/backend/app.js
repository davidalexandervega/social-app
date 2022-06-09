// importing & defining express:
const express = require('express');
const app = express();

// importing dotenv to allow for use of the .env file:
const dotenv = require('dotenv').config();

// importing a simple error handler middleware:
const { errorHandler } = require('./middleware/errorMiddleware');

// setting the express server port:
const PORT = process.env.PORT || 5000;

// connects to the database:
const connectDB = require('./config/db');
connectDB();

// you need to use cors in order to make a request
// across different ports. react is served from
// port 3000:
const cors = require('cors');
app.use(
  cors({
    origin: ['http://localhost:3000'],
  }),
);

// middleware to parse json:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// simple example route:
app.get('/api/message', (req, res) => {
  res.send('hello');
});

// example route using express router:
// here, express will use the required file for all child routes/methods
// of the parent route specified here. the route file itself only contains
// routes and their handler functions. the handler functions are imported
// from the controller file, which contains all of the logic for handling
// the requests.
// routes:
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// catch errors:
app.use(errorHandler);

// starting the express server:
app.listen(PORT, () => console.log(`server started on port ${PORT}.`));
