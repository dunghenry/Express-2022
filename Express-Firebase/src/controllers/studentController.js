const firebase = require('../db');
const Student = require('../models/student');
const db = firebase.firestore();

const addStudent = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(data)
        await db.collection('students').doc().set((data));
        res.send('Record saved successfuly');
    } catch (error) {

        res.status(400).send(error.message);
    }
}
const getAllStudents = async (req, res) => {
    try {
        const students = await db.collection('students');
        const data = await students.get();
        const studentsArr = [];
        console.log(data.empty)
        if(data.empty) {
            res.status(400).send("No student record found");
        }
        else{
            data.forEach(doc =>{
                const student = new Student(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName,
                ) 
                studentsArr.push(student);
            })
            res.send(studentsArr);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    addStudent,
    getAllStudents
}