export interface User {
    userName: string;
    email: string;
    password: string;
    profile: 'ALUNO' | 'PROFESSOR';
}

export const users: User[] = [
    { userName: 'Inae', email: 'inae@gmail.com', password: '123456', profile: 'ALUNO' },
    { userName: 'Gabriel', email: 'Gabriel@gmail.com', password: '123456', profile: 'PROFESSOR' },
];