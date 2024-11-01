import express, { Request, Response } from 'express';
import { users, User } from './main/data/model/User';
import { classes, Class } from './main/data/model/Class';

const application = express();
application.use(express.json());

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const PORT = 3000;


application.post('/singin', (req, res) => {
    const { userName, email, password, profile } = req.body;

    if (profile !== 'ALUNO' || profile !== 'PROFESSOR') {
        return res.status(BAD_REQUEST).json({ error: 'Invalid profile' })
    };

    const existentUser = users.find((u) => u.userName === userName);
    if (existentUser) {
        return res.status(BAD_REQUEST).json({ error: 'User already exists.' });
    };

    const newUser: User = {
        userName,
        email,
        password,
        profile
    };

    users.push(newUser);
    res.status(CREATED).json(newUser);
});

application.get('/login', (req, res) => {
    const { userName, password, profile } = req.body;
    const existentUser = users.find((u) => u.userName === userName && u.password === password && u.profile === profile);

    if (!existentUser) {
        return res.status(NOT_FOUND).json({ error: 'Invalid credentials' });
    }

    res.status(OK).json({ message: 'Welcome, ${existentUser.userName}!', profile: existentUser.profile });
});

application.post('/class', (req, res) => {
    const { userName, password, className, schedule } = req.body;

    const teacherProfile = users.find((u) => u.userName === userName && u.password === password && u.profile === 'PROFESSOR');
    if (!teacherProfile) {
        return res.status(FORBIDDEN).json({ error: 'Access denied.' });
    }

    const newClass: Class = {
        classId: classes.length + 1,
        className,
        teacher: teacherProfile.userName
        studentsRegistered,
        schedule,
    };

    classes.push(newClass);
    res.status(CREATED).json(newClass);
});

application.put('/class/registration', (req, res) => {
    const { userName, password, classId } = req.body;
    const studentProfile = users.find((u) => u.userName === userName && u.password === password && u.profile === 'ALUNO');

    if (!studentProfile) {
        return res.status(FORBIDDEN).json({ error: 'Access denied.' });
    }

    const classExistent = classes.find((t) => t.classId === classId);
    if (!classExistent) {
        return res.status(NOT_FOUND).json({ error: 'Invalid class.' });
    }

    classExistent.studentsRegistered = classExistent.studentsRegistered +1;
    res.status(OK).json({ message: 'Successful registration.', classExistent });
});


application.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});