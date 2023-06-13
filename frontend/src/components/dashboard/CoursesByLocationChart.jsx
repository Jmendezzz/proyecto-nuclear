import { Bar } from "react-chartjs-2";
import { location } from "../../enums/Location"
import Chart from 'chart.js/auto';


export const CoursesByLocationChart = ({ courses }) => {
    const data = {
        labels: location.map(location => location.name),
        datasets: [{
            label: 'Numero de cursos por ubicación',
            data: location.map(location =>
                courses.filter(course =>
                    course.courseSchedule.some(
                        schedule => schedule.classroom.location === location.value
                    )).length
            ),
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
        },
        ],
    };
    return <Bar data={data} />;
}