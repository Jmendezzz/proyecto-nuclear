package co.edu.cue.proyectonuclear.infrastructure.dao.impl;

import co.edu.cue.proyectonuclear.domain.entities.Student;
import co.edu.cue.proyectonuclear.infrastructure.dao.StudentDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.StudentMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
@AllArgsConstructor
public class StudentDAOImpl implements StudentDAO {

    @PersistenceContext
    EntityManager entityManager;
    StudentMapper studentMapper;

    @Override
    public StudentDTO getStudentById(Long id) {
        Student student = entityManager.find(Student.class,id);
        return studentMapper.mapFromEntity(student);
    }

    @Override // El DAO recibe el DTO para crear el student y lo mapea y lo guarda en la base de datos para luego hacer otro mappeo de otro DTO como respuesta.
    public StudentDTO saveStudent(CreateStudentRequestDTO createStudentRequestDTO) {
        Student student = studentMapper.mapFromDTO(createStudentRequestDTO);
        Student studentSave = entityManager.merge(student);
        return studentMapper.mapFromEntity(studentSave);
    }

    @Override
    public List<StudentDTO> getAllStudent(){
        String query = "FROM Student";
        Query nativeQuery = entityManager.createQuery(query);
        List<Student> students = nativeQuery.getResultList();
        return students.parallelStream().map(s->studentMapper.mapFromEntity(s)).toList();
    }
    @Override
    public List<StudentDTO> getBySemester(Integer semester) {
        String query = "SELECT * FROM student WHERE student_semester= :semester";
        Query nativeQuery = entityManager.createNativeQuery(query);
        nativeQuery.setParameter("semester", semester);
        List<Student> students = nativeQuery.getResultList();
        return students.parallelStream().map(s->studentMapper.mapFromEntity(s)).toList();
    }
}