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

const getStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const student = await db.collection("students").doc(id);
        const data = await student.get();
        if(!data.exists){
            res.status(400).send("Student with the given ID not found.");
        }
        else{
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const updateStudent = async(req, res) =>{
    try {
        
        const id = req.params.id;
        const data = req.body;
        const student = await db.collection("students").doc(id);
        await student.update(data);
        res.send("Student record updated successfully!");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;
        await db.collection("students").doc(id).delete();
        res.send("Record deleted successfully!");
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    addStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent
}