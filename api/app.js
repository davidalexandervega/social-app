const path = require('path');
const express = require('express');
const app = express();

const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 5000;

// utilize cors to make requests across different ports locally:
const cors = require('cors');
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

// use middleware to parse json:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use routes:
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/replies', require('./routes/replyRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

// serve client in production:
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
  );
}

// use error middleware:
app.use(errorHandler);

// serve client in development:
app.listen(PORT, () => console.log(`social-infinity API server running on port ${PORT}.`));
