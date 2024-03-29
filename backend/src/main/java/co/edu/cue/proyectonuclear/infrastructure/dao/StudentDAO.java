package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.mapping.dtos.CreateStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;

import java.util.List;
import java.util.Optional;

public interface StudentDAO {
    List<StudentDTO> getAllStudent();
    Optional<StudentDTO> getStudentByNid(String nid);
    StudentDTO saveStudent(CreateStudentRequestDTO createStudentRequestDTO);
    List<StudentDTO> getBySemester(Integer semester);
    StudentDTO updateStudent(StudentDTO studentDTO);
    StudentDTO deleteStudent(Long id);

    Optional<StudentDTO> getStudentById(Long id);

    List<StudentDTO> getStudentsBySubjectId(Long subjectId);
}