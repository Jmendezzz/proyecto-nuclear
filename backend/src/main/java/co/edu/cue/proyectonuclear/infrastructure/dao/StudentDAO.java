package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.mapping.dtos.CreateStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;

import java.util.List;

public interface StudentDAO {
    List<StudentDTO> getAllStudent();
    StudentDTO getStudentById(Long id);
    StudentDTO saveStudent(CreateStudentRequestDTO createStudentRequestDTO);
    List<StudentDTO> getBySemester(Integer semester);
}