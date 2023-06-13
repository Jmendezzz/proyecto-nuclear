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

  useEffect(() => {
    setVisibleRows([]);
    const timeoutId = setTimeout(() => setVisibleRows(data.map(row => row.label)), 300);
    return () => clearTimeout(timeoutId);
  }, [data]);

  return (
    <>
      <button onClick={() => setGrouping(grouping === 'career' ? 'semester' : 'career')}>
        Group by {grouping === 'career' ? 'Semester' : 'Career'}
      </button>
      <table>
        <thead>
          <tr>
            <th>{grouping === 'career' ? 'Career' : 'Semester'}</th>
            <th>Number of Students</th>
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