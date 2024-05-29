const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const expenseRoutes = require('./routes/expenseRoutes');
const path = require('path');

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/expenses', expenseRoutes);

// Sync database and start server
sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
