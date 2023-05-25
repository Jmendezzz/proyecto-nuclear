package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Course;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public class CourseDAOImpl  implements CourseDAO{
    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Course saveCourse(Course course) {
        return entityManager.merge(course);
    }

    @Override
    public List<Course> getAllCourses() {
        String query = "FROM Course";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Course createCourse(Course course){
        return entityManager.merge(course);

    }

    @Override
    public Course findCourseById(Long id) {
        return entityManager.find(Course.class,id);
    }

    @Override
    public List<Course> getCoursesByProfessorId(Long id) {
        String query = "SELECT * FROM course WHERE professor_id = :professorId";

        return entityManager.createNativeQuery(query).getResultList();
    }

}
