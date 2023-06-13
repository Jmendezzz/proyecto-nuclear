import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export const ProfessorCourseChart = ({ courses }) => {
  const professors = [...new Set(courses.map(course => course.professor.name))];
  const data = {
    labels: professors,
    datasets: [
      {
        label: 'Number of Courses',
        data: professors.map(professor =>
          courses.filter(course => course.professor.name === professor).length
        ),
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  };
  return <Bar data={data} />;
};
