import { useState } from 'react';
import { Bar } from 'react-chartjs-2';

export const StudentDistributionChart = ({ students }) => {
  const [grouping, setGrouping] = useState('career');

  const careers = [...new Set(students.map(student => student.career))];
  const semesters = [...new Set(students.map(student => student.semester))];

  const data =
    grouping === 'career'
      ? {
          labels: careers,
          datasets: [
            {
              label: 'Número de estudiantes por carrera',
              data: careers.map(career =>
                students.filter(student => student.career === career).length
              ),
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
            },
          ],
        }
      : {
          labels: semesters,
          datasets: [
            {
              label: 'Número de estudiantes por semestre',
              data: semesters.map(semester =>
                students.filter(student => student.semester === semester).length
              ),
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
            },
          ],
        };

  return (
    <>
      <button onClick={() => setGrouping(grouping === 'career' ? 'semester' : 'career')}>
        Agrupar por {grouping === 'career' ? 'Semestre' : 'Carrera'}
      </button>
      <Bar data={data} />
    </>
  );
};
