package co.edu.cue.proyectonuclear.infrastructure.controllers;

import co.edu.cue.proyectonuclear.exceptions.StudentException;
import co.edu.cue.proyectonuclear.exceptions.SubjectException;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;
import co.edu.cue.proyectonuclear.services.StudentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor //TODO: Test JSON Post with the Subject.
public class StudentController {
    StudentService studentService;
    @GetMapping("/students")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PROFESSOR')")
    public List<StudentDTO> getAllStudent(){ return studentService.getAllStudent();}



    @GetMapping("/students/nid/{nid}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PROFESSOR')")
    public ResponseEntity<StudentDTO> getStudentByNid(@PathVariable String nid){

        Optional<StudentDTO> studentDTO = studentService.getStudentByNid(nid);
        if(studentDTO.isEmpty())
            throw new StudentException("No se ha encontrado un estudiante con numero de identificacion: "+nid, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(studentDTO.get(), HttpStatus.OK);

    }

    @GetMapping("/students/semester/{semesterNumber}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PROFESSOR')")
    public List<StudentDTO> getStudentsBySemester(@PathVariable Integer semesterNumber){

        return studentService.getBySemester(semesterNumber);
    }

    @PostMapping("/students/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StudentDTO> createStudent(@Valid @RequestBody CreateStudentRequestDTO student){
        StudentDTO studentDTOcreated = studentService.saveStudent(student);
        return new ResponseEntity<>(studentDTOcreated, HttpStatus.CREATED);
    }

    @PutMapping("/students/update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StudentDTO> updateStudent(@Valid @RequestBody StudentDTO studentDTO){

        StudentDTO student = studentService.updateStudent(studentDTO);
        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    @DeleteMapping("/students/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StudentDTO> deleteStudentById(@PathVariable Long id) {

        StudentDTO studentDTO = studentService.deleteStudent(id);
        return new ResponseEntity<>(studentDTO, HttpStatus.OK);

    }

    @GetMapping("/students/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PROFESSOR')")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {

        Optional<StudentDTO> studentDTO =  studentService.getStudentById(id);
        if(studentDTO.isEmpty()) throw  new SubjectException("Subject not found with the id: "+ id,HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(studentDTO.get(), HttpStatus.OK);

    }

    @GetMapping("/students/subjects/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PROFESSOR')")
    public List<StudentDTO> getStudentsBySubjectId(@PathVariable Long id){
        return studentService.getStudentsBySubjectId(id);
    }

}
