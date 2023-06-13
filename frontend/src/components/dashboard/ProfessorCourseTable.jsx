export const ProfessorCourseTable = ({courses}) => {
    const professors = [...new Set(courses.map(course => course.professor.name))];
    const data = professors.map(professor => ({
        professor,
        courses: courses.filter(course => course.professor.name === professor).length,
    }));
    return (
    <table>
        <thead>
          <tr>
            <th>Professor</th>
            <th>Courses</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.professor}>
              <td>{row.professor}</td>
              <td>{row.courses}</td>
            </tr>
          ))}
        </tbody>
      </table>
      );
}