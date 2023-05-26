package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.domain.entities.Student;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;
import co.edu.cue.proyectonuclear.services.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor //TODO: Test JSON Post with the Subject.
public class StudentController {
    StudentService studentService;
    @GetMapping("/students")
    public List<StudentDTO> getAllStudent(){return studentService.getAllStudent();}

    @GetMapping("/students/{id}")
    public StudentDTO getById(@PathVariable Long id){
        Optional<StudentDTO> student = studentService.getStudentById(id);
        //TODO: Do a validation if the student exists
        return student.get();
    }

    @GetMapping("/students/semester/{semesterNumber}")
    public List<StudentDTO> getStudentsBySemester(@PathVariable Integer semesterNumber){return studentService.getBySemester(semesterNumber);}

    @PostMapping("/students") // Acá es donde deberiamos recibir el DTO para crear estudiante
    public StudentDTO createStudent(@RequestBody CreateStudentRequestDTO student){return studentService.saveStudent(student);}

}
