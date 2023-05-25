package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Student;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;

import java.util.List;
import java.util.Optional;

public interface StudentDAO {
    List<Student> getAllStudent();
    Optional<Student> getStudentById(Long id);
    Student saveStudent(Student student);
    //List<StudentDTO> getBySemester(Integer semester);
}