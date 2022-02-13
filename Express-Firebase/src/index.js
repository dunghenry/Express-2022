const express = require('express');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const studentRoutes = require('./routes/student')
const db = require('./db');
const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
const port = process.env.PORT || 5000;
app.use('/api', studentRoutes.routes);
app.get('/', (req, res) =>{
    res.json({message: "Successfully"})
})
// console.log(db)
app.listen(port, () => console.log(`App running: http://localhost:${port}`))