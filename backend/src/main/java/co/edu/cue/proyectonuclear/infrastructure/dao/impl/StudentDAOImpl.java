package co.edu.cue.proyectonuclear.infrastructure.dao.impl;

import co.edu.cue.proyectonuclear.domain.entities.Student;
import co.edu.cue.proyectonuclear.exceptions.StudentException;
import co.edu.cue.proyectonuclear.exceptions.SubjectException;
import co.edu.cue.proyectonuclear.infrastructure.dao.StudentDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.StudentMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
@AllArgsConstructor
public class StudentDAOImpl implements StudentDAO {

    @PersistenceContext
    EntityManager entityManager;
    StudentMapper studentMapper;

    @Override
    public Optional<StudentDTO> getStudentByNid(String nid) {
        String query = "SELECT u.* FROM student s INNER JOIN user u ON s.id = u.id WHERE u.nid = :nidStudent";
        Query nativeQuery = entityManager.createNativeQuery(query,Student.class);
        nativeQuery.setParameter("nidStudent", nid);
        try{
            Student student = (Student) nativeQuery.getSingleResult();
            StudentDTO studentDTO = studentMapper.mapFromEntity(student);
            return Optional.of(studentDTO);
        }catch (NoResultException ex){
            return Optional.empty();
        }
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
        List<Student> students = entityManager.createQuery(query).getResultList();
        return studentMapper.mapFrom(students);
    }
    @Override
    public List<StudentDTO> getBySemester(Integer semester) {
        String query = "SELECT * FROM student WHERE student_semester= :semester";
        Query nativeQuery = entityManager.createNativeQuery(query);
        nativeQuery.setParameter("semester", semester);
        List<Student> students = nativeQuery.getResultList();
        return students.parallelStream().map(s->studentMapper.mapFromEntity(s)).toList();
    }

    @Override
    public StudentDTO updateStudent(StudentDTO studentDTO) {
        validateStudentById(studentDTO.id());
        Student studentEntity = entityManager.find(Student.class,studentDTO.id());
        if (studentEntity == null) throw new StudentException("Can not update, the id:" + studentDTO.id() + " does not exists", HttpStatus.BAD_REQUEST);
        studentEntity.setName(studentDTO.name());
        studentEntity.setLastName(studentDTO.lastName());
        studentEntity.setEmail(studentDTO.email());
        studentEntity.setSubjects(studentDTO.subjects());
        Student studentUpdated = entityManager.merge(studentEntity);
        return studentMapper.mapFromEntity(studentUpdated);
    }

    @Override
    public StudentDTO deleteStudent(Long id) {
        Student studentEntity = entityManager.find(Student.class,id);
        if(studentEntity == null) throw new  SubjectException("Can not delete, the id:" + id + " does not exists", HttpStatus.BAD_REQUEST);
        entityManager.remove(studentEntity);
        return studentMapper.mapFromEntity(studentEntity);
    }

    @Override
    public Optional<StudentDTO> getStudentById(Long id) {
        try{
            Student student = entityManager.find(Student.class, id);
            return Optional.of(studentMapper.mapFromEntity(student));
        }catch (NullPointerException ex){
            return Optional.empty();
        }
    }

    private StudentDTO validateStudentById(Long id){
        Optional<StudentDTO> studentExist = getStudentById(id);
        if (studentExist.isEmpty()){
            throw new StudentException("no se encontro un estudiante con el id" + id, HttpStatus.BAD_REQUEST);
        }
        else return studentExist.get();
    }

    @Override
    public List<StudentDTO> getStudentsBySubjectId(Long subjectId) {

        String query = "SELECT s.id from student s INNER JOIN student_subjects sc on s.id = sc.student_id WHERE sc.subjects_id = :subjectId";

        Query nativeQuery = entityManager.createNativeQuery(query);
        nativeQuery.setParameter("subjectId",subjectId);


        try{
            List<Long> studentsIds = nativeQuery.getResultList();
            return studentsIds.stream()
                    .map(id->getStudentById(id).get())
                    .toList();
        }catch (NoResultException e){
            throw new StudentException("No se encontraron estudiantes registrados en la asignatura identificada por el id:" + subjectId ,HttpStatus.BAD_REQUEST);
        }
    }
}