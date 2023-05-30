package co.edu.cue.proyectonuclear.infrastructure.dao.impl;

import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.infrastructure.dao.CourseDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.CourseMapper;
import jakarta.persistence.EntityManager;
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
    @Override
    public CourseDTO saveCourse(CourseDTO courseDTO) {
        Course course = courseMapper.mapFromDTO(courseDTO);
        Course courseSaved =  entityManager.merge(course);
        return courseMapper.mapFromEntity(courseSaved);
    }

    @Override
    public List<CourseDTO> getAllCourses() {
        String query = "FROM Course";
        return entityManager.createQuery(query).getResultList();
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
    public List<CourseStudentRequestDTO> getCoursesByStudentId(Long id) {//TODO Test
        String query = "SELECT c.* FROM course c INNER JOIN course_students cs on c.id = cs.course_id WHERE students_id = :studentId";
        Query nativeQuery = entityManager.createNativeQuery(query,Course.class);
        nativeQuery.setParameter("studentId",id);
        return mapEntityList(nativeQuery.getResultList());

    }
    private List<CourseStudentRequestDTO>  mapEntityList(List<Course> courses){//TODO Crear una función generica para esto.
        return courses.stream()
                .map(s-> courseMapper.mapStudentRequestFromEntity(s))
                .toList();
    }
}
