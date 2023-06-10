package co.edu.cue.proyectonuclear.infrastructure.dao.impl;

import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.domain.entities.CourseSchedule;
import co.edu.cue.proyectonuclear.infrastructure.dao.CourseDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.GenerateCourseDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.CourseMapper;
import co.edu.cue.proyectonuclear.mapping.mappers.CourseScheduleMapper;
import co.edu.cue.proyectonuclear.mapping.mappers.ProfessorMapper;
import co.edu.cue.proyectonuclear.mapping.mappers.StudentMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
@AllArgsConstructor
public class CourseDAOImpl  implements CourseDAO {
    @PersistenceContext
    EntityManager entityManager;
    CourseMapper courseMapper;

    StudentMapper studentMapper;

    ProfessorMapper professorMapper;

    CourseScheduleMapper courseScheduleMapper;
    @Override
    public CourseDTO saveCourse(GenerateCourseDTO courseDTO) {

        String query  = "SELECT * FROM course where subject_id = :subjectId";
        Query nativeQuery =   entityManager.createNativeQuery(query,Course.class);
        nativeQuery.setParameter("subjectId", courseDTO.subject().id());

        try{
            Course existingCourse = (Course) nativeQuery.getSingleResult();

            existingCourse.setStudents(studentMapper.mapFromListDTO(courseDTO.students()));
            existingCourse.setCourseSchedule(courseScheduleMapper.mapFromDTOList(courseDTO.courseSchedule()));
            existingCourse.setProfessor( professorMapper.mapFrom(courseDTO.professor()));
            Course courseSaved =  entityManager.merge(existingCourse);
            return courseMapper.mapFromEntity(courseSaved);

        } catch (NoResultException ex){
            Course course = courseMapper.mapFromGenerateDTO(courseDTO);
            Course courseSaved =  entityManager.merge(course);
            return courseMapper.mapFromEntity(courseSaved);
        }

    }

    @Override
    public List<CourseDTO> getAllCourses() {
        String query = "FROM Course";
        List<Course>  courses= entityManager.createQuery(query).getResultList();
        courses.stream().forEach(c-> System.out.println(c));

        return courseMapper.mapFromEntity(entityManager.createQuery(query).getResultList());
    }


    @Override
    public CourseDTO findCourseById(Long id) {
        Course course = entityManager.find(Course.class,id);
        return courseMapper.mapFromEntity(course);
    }

    @Override
    public List<CourseDTO> getCoursesByProfessorId(Long id) {
        String query = "SELECT * FROM course WHERE professor_id = :professorId";
        Query nativeQuery = entityManager.createNativeQuery(query, Course.class);
        nativeQuery.setParameter("professorId",id);
        List<Course> courses = nativeQuery.getResultList();
        return courses.stream()
                .map(c->courseMapper.mapFromEntity(c))
                .toList();
    }

    @Override
    public List<CourseDTO> getCoursesByStudentId(Long id) {//TODO Test
        String query = "SELECT c.* FROM course c INNER JOIN course_students cs on c.id = cs.course_id WHERE students_id = :studentId";
        Query nativeQuery = entityManager.createNativeQuery(query,Course.class);
        nativeQuery.setParameter("studentId",id);
        return courseMapper.mapFromEntity(nativeQuery.getResultList());

    }

    @Override
    public List<CourseDTO> getCoursesByClassroomId(Long id){
        String query = "SELECT c.* FROM course c INNER JOIN course_schedule cs ON c.id = cs.course_id WHERE classroom_id = :classroomId ";
        Query nativeQuery = entityManager.createNativeQuery(query,Course.class);
        nativeQuery.setParameter("classroomId", id);
        return courseMapper.mapFromEntity(nativeQuery.getResultList());
    }
}
