import { Bar } from "react-chartjs-2";
import { location } from "../../enums/Location"
import Chart from 'chart.js/auto';


export const CoursesByLocationChart = ({ courses }) => {
    const locationValues = location.map(location => location.value)
    const data = {
        labels: locationValues,
        datasets: [{
            label: 'numero de cursos',
            data: locationValues.map(location =>
                courses.filter(course =>
                    course.courseSchedule.some(
                        schedule => schedule.classroom.location === location
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