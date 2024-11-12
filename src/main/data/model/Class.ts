export interface Class {
    classId: number;
    className: string;
    teacher: string;
    studentsRegistered: number;
    schedule: number;
}

export const classes: Class[] = [
    {classId: 1, className: 'Programação Backend', teacher: 'Vinicius', studentsRegistered: 3, schedule: 63}
];