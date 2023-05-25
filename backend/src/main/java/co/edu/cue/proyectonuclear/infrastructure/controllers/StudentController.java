package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.domain.entities.Student;
import co.edu.cue.proyectonuclear.services.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class StudentController {
    StudentService studentService;
    @GetMapping("/students")
    public List<Student> getAllStudent(){return studentService.getAllStudent();}

    @GetMapping("/students/{id}")
    public Student getById(@PathVariable Long id){
        Optional<Student> student = studentService.getStudentById(id);
        //TODO: Do a validation if the student exists
        return student.get();
    }
}
