const express = require("express");

require("dotenv").config();

const studentRoutes = require('./student/routes');

const morgan = require('morgan');

const cors = require("cors");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

require('events').EventEmitter.defaultMaxListeners = 0;

const app = express();

app.use(express.urlencoded({ extended: false}));

app.use(express.json());

const port = 5000;

app.use(cors(corsOptions));

app.use(morgan('combined'));


app.get("/", (req, res) => {
  res.json({data:"This is getHomePage"});
});

app.use('/api/v1/students', studentRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
