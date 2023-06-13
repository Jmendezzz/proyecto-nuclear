package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.domain.enums.Career;
import jakarta.validation.constraints.*;

import java.util.List;
/*
* Este DTO es importante, olvidamos que los id no tenian que ser autogenerados.
* El DTO es para una peticion de crear Student.
* En el mapper se le asigna la password a la Entidad y el role
* */
public record CreateStudentRequestDTO(
        @Size(message = "El nid debe tener una longitud entre 7 y 10",  min = 7, max = 10)
        String nid,
        @NotNull
        String name,
        @NotNull
        @Email(message = "El email ingresado debe ser válido")
        String email,
        @NotNull
        String lastName,
        @NotNull
        Career career,
        @NotNull
        @Min(value = 1, message = "El semestre no es válido")
        @Max(value = 10, message = "El semestre no es válido")
        Integer semester,
        List<Subject> subjects){
}
