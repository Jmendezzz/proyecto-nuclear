export const CoursesByLocationTable = ({courses}) => {
    const locations = ['Principal', 'Nogal', 'Anova', 'Alcazar', 'Campina'];
    const data = locations.map(location => ({
        location, courses: courses.filter(course=>
            course.courseSchedule.some(
                schedule => schedule.classroom.location === location
            )
            ).length,
    }));
    return (
        <table>
      <thead>
        <tr>
          <th>Location</th>
          <th>Courses</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.location}>
            <td>{row.location}</td>
            <td>{row.courses}</td>
          </tr>
        ))}
      </tbody>
    </table>
    );

}