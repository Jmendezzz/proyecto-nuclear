package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Student;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;

import java.util.List;
import java.util.Optional;

public interface StudentDAO {
    List<StudentDTO> getAllStudent();
    StudentDTO getStudentById(Long id);
    StudentDTO saveStudent(StudentDTO studentDTO);
    List<StudentDTO> getBySemester(Integer semester);
}