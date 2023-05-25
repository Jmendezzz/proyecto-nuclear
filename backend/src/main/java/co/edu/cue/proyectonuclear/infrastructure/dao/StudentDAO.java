package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Student;

import java.util.List;
import java.util.Optional;

public interface StudentDAO {
    List<Student> getAllStudent();
    Optional<Student> getStudentById(Long id);
    Student saveStudent(Student student);
}