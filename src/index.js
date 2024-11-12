"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const User_1 = require("./main/data/model/User");
const Class_1 = require("./main/data/model/Class");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const PORT = 3000;
app.post('/signin', (req, res) => {
    const { userName, email, password, profile } = req.body;
    if (profile !== 'ALUNO' && profile !== 'PROFESSOR') {
        return res.status(400).json({ error: 'Invalid profile' });
    }
    const existentUser = User_1.users.find((u) => u.userName === userName);
    if (existentUser) {
        return res.status(400).json({ error: 'User already exists.' });
    }
    const newUser = { userName, email, password, profile };
    User_1.users.push(newUser);
    return res.status(201).json(newUser);
});
app.post('/login', (req, res) => {
    const { userName, password, profile } = req.body;
    const existentUser = User_1.users.find((u) => u.userName === userName && u.password === password && u.profile === profile);
    if (!existentUser) {
        return res.status(NOT_FOUND).json({ error: 'Invalid credentials' });
    }
    res.status(OK).json({ message: `Welcome, ${existentUser.userName}!`, profile: existentUser.profile });
});
app.post('/class', (req, res) => {
    const { userName, password, className, schedule } = req.body;
    const teacherProfile = User_1.users.find((u) => u.userName === userName && u.password === password && u.profile === 'PROFESSOR');
    if (!teacherProfile) {
        return res.status(FORBIDDEN).json({ error: 'Access denied.' });
    }
    const newClass = {
        classId: Class_1.classes.length + 1,
        className,
        teacher: teacherProfile.userName,
        studentsRegistered: 0,
        schedule,
    };
    Class_1.classes.push(newClass);
    res.status(CREATED).json(newClass);
});
app.put('/class/registration', (req, res) => {
    const { userName, password, classId } = req.body;
    const studentProfile = User_1.users.find((u) => u.userName === userName && u.password === password && u.profile === 'ALUNO');
    if (!studentProfile) {
        return res.status(FORBIDDEN).json({ error: 'Access denied.' });
    }
    const classExistent = Class_1.classes.find((t) => t.classId === classId);
    if (!classExistent) {
        return res.status(NOT_FOUND).json({ error: 'Invalid class.' });
    }
    classExistent.studentsRegistered += 1;
    res.status(OK).json({ message: 'Successful registration.', classExistent });
});
app.delete('/class', (req, res) => {
    const { userName, password, classId } = req.body;
    const teacherProfile = User_1.users.find((u) => u.userName === userName && u.password === password && u.profile === 'PROFESSOR');
    if (!teacherProfile) {
        return res.status(FORBIDDEN).json({ error: 'Access denied.' });
    }
    const classIndex = Class_1.classes.findIndex((t) => t.classId === classId);
    if (classIndex === -1) {
        return res.status(NOT_FOUND).json({ error: 'Class not found.' });
    }
    const deletedClass = Class_1.classes.splice(classIndex, 1)[0];
    res.status(OK).json({ message: 'Class deleted successfully', deletedClass });
});
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
