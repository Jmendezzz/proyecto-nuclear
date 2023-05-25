package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public class StudentDAOImpl implements StudentDAO {

    @PersistenceContext
    EntityManager entityManager;
    @Override
    public List<Student> getAllStudent(){
        String query = "FROM Student";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Optional<Student> getStudentById(Long id) {
        return Optional.of(entityManager.find(Student.class, id));
    }

    @Override
    public Student saveStudent(Student student) {
        return entityManager.merge(student);
    }
}
