
export const StudentsByCourseTable = ({courses}) => {
    const data = courses.map(course => ({
        course: course.subject.name,
        students: course.students.length,
    }));
    return (
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Students</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.course}>
                <td>{row.course}</td>
                <td>{row.students}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
}