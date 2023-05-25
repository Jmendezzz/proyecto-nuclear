package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.domain.entities.Course;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public class ClassroomDAOImpl implements ClassroomDAO {

    @PersistenceContext
    EntityManager entityManager;
    @Override
    public Classroom createClassroom(Classroom classroom) {
        return entityManager.merge(classroom);
    }

    @Override
    public Classroom findCourseById(Long id) {
        return entityManager.find(Classroom.class,id);
    }

    @Override
    public List<Classroom> getAllClassrrom() {
        String query = "FROM Classroom";
        return entityManager.createQuery(query).getResultList();
    }


}
