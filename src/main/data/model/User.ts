export interface User {
    userName: String;
    email: String;
    password: String;
    profile: 'ALUNO' | 'PROFESSOR';
}

export const users: User[] = [
    {userName: 'Inae', email: 'inae@gmail.com', password: '123456', profile: 'ALUNO'},
    {userName: 'Gabriel', email: 'Gabriel@gmail.com', password: '123456', profile: 'PROFESSOR'},
];