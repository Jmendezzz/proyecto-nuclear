import { useState, useEffect } from 'react';
import style from "./Dashboard.module.css";

export const StudentDistributionTable = ({ students }) => {
  const [grouping, setGrouping] = useState('career');
  const [visibleRows, setVisibleRows] = useState([]);

  const careers = [...new Set(students.map(student => student.career))];
  const semesters = [...new Set(students.map(student => student.semester))];

  const data =
    grouping === 'career'
      ? careers.map(career => ({
          label: career,
          value: students.filter(student => student.career === career).length,
        }))
      : semesters.map(semester => ({
          label: semester,
          value: students.filter(student => student.semester === semester).length,
        }));

  return (
    <>
      <button onClick={() => setGrouping(grouping === 'career' ? 'semester' : 'career')}>
        Agrupar por {grouping === 'career' ? 'Semestre' : 'Carrera'}
      </button>
      <table>
        <thead>
          <tr>
            <th>{grouping === 'career' ? 'Carrera' : 'Semestre'}</th>
            <th>Número de estudiantes</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr
              key={row.label}
              className={`table-row ${visibleRows.includes(row.label) ? 'visible' : ''}`}
            >
              <td>{row.label}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};