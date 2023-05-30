package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.domain.entities.Student;
import co.edu.cue.proyectonuclear.exceptions.ClassroomNotFoundException;
import co.edu.cue.proyectonuclear.exceptions.StudentNotFoundException;
import co.edu.cue.proyectonuclear.exceptions.SubjectNotFoundException;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import co.edu.cue.proyectonuclear.services.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<StudentDTO> getById(@PathVariable Long id){
        Optional<StudentDTO> studentDTO = studentService.getStudentById(id);
        if(studentDTO.isEmpty()) throw  new StudentNotFoundException("Student not found with the id: "+ id);
        return new ResponseEntity<>(studentDTO.get(), HttpStatus.OK);
    }

    @GetMapping("/students/semester/{semesterNumber}")
    public List<StudentDTO> getStudentsBySemester(@PathVariable Integer semesterNumber){
        return studentService.getBySemester(semesterNumber);
    }

    @PostMapping("/students")
    public StudentDTO createStudent(@RequestBody CreateStudentRequestDTO student){
        return studentService.saveStudent(student);
    }

    @PutMapping("/students/{id}")
    public ResponseEntity<StudentDTO> updateStudent(@PathVariable Long id, @RequestBody StudentDTO studentDTO){
        StudentDTO student = studentService.updateStudent(id, studentDTO);
        if (student == null) throw new StudentNotFoundException("Student not found with the id"+id);
        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    @DeleteMapping("/student/{id}")
    public ResponseEntity<StudentDTO> deleteStudentById(@PathVariable Long id) {
        StudentDTO studentDTO = studentService.deleteStudent(id);
        if (studentDTO == null) throw new StudentNotFoundException("Student not found with the id"+id);
        return new ResponseEntity<>(studentDTO, HttpStatus.OK);

    }
}
