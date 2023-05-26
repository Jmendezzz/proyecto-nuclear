package co.edu.cue.proyectonuclear.services;

import co.edu.cue.proyectonuclear.mapping.dtos.CreateStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    List<StudentDTO> getAllStudent();
    Optional<StudentDTO> getStudentById(Long id);

    StudentDTO saveStudent(CreateStudentRequestDTO createStudentRequestDTO);
    List<StudentDTO> getBySemester( Integer semester);
}
