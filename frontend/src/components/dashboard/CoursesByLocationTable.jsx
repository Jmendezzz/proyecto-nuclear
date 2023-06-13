import { location } from "../../enums/Location";

export const CoursesByLocationTable = ({courses}) => {
    const data = location.map(location => ({
        location, courses: courses.filter(course=>
            course.courseSchedule.some(
                schedule => schedule.classroom.location === location.value
            )
            ).length,
    }));
    return (
        <table>
      <thead>
        <tr>
          <th>Ubicación</th>
          <th># de cursos</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.location.name}>
            <td>{row.location.name}</td>
            <td>{row.courses}</td>
          </tr>
        ))}
      </tbody>
    </table>
    );

}