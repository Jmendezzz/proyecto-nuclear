package co.edu.cue.proyectonuclear.infrastructure.constrains;

import co.edu.cue.proyectonuclear.exceptions.StudentException;
import co.edu.cue.proyectonuclear.infrastructure.dao.StudentDAO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;


import java.util.Optional;

@Component
@AllArgsConstructor
public class StudentConstrain {
     private final StudentDAO studentDAO;
    public StudentDTO validateStudentById(Long id){
        Optional<StudentDTO> studentExist = studentDAO.getStudentById(id);
        if (studentExist.isEmpty()){
            throw new StudentException("no se puede eliminrar el estudiantes, id incorrecto", HttpStatus.BAD_REQUEST);
        }
        else return studentExist.get();
    }
}
