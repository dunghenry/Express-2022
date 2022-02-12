const pool = require('../db');

const getStudents = (req, res) =>{
    pool.query("SELECT * FROM students", (err, results) =>{
        if(err) throw err;
        res.status(200).json(results.rows)
    })
}

module.exports ={ getStudents }