export interface Class {
    classId: number;
    className: String;
    teacher: String;
    studentsRegistered: number;
    schedule: number;
}

export const classes: Class[] = [
    {classId: 1, className: 'Programação Backend', teacher: 'Vinicius', studentsRegistered: 3, schedule: 63}
];