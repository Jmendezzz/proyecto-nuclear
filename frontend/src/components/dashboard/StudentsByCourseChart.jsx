import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export const StudentsByCourseChart = ({ courses }) => {
    const data = {
        labels: courses.map(course => course.subject.name),
        datasets: [
            {
                label: 'Numero de estudiantes por materia',
                data: courses.map(course => course.students.length),
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
            }
        ]
    }
}