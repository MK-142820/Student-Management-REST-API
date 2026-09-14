const express = require("express");
const router = express.Router();

let students = require("../data/students");

// GET /students
router.get("/", (req, res) => {
    res.status(200).json(students);
});

// GET /students/:id
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }

    res.status(200).json(student);
});

// POST /students
router.post("/", (req, res) => {
    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({
            message: "Name and course are required"
        });
    }

    const newStudent = {
        id: students.length > 0
            ? students[students.length - 1].id + 1
            : 1,
        name: name,
        course: course
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

// PUT /students/:id
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }

    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({
            message: "Name and course are required"
        });
    }

    student.name = name;
    student.course = course;

    res.status(200).json(student);
});

// DELETE /students/:id
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.status(200).json({
        message: "Student Deleted",
        student: deletedStudent[0]
    });
});

module.exports = router;