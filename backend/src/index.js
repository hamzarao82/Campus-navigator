const express = require('express');
const limiter = require('./middleware/rateLimit');
const app = express();

// Apply rate limiting
app.use(limiter);

// Rest of your server code...
