package co.edu.cue.proyectonuclear.mapping.dtos;

import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.domain.enums.Career;

import java.util.List;
/*
* Este DTO es importante, olvidamos que los id no tenian que ser autogenerados.
* El DTO es para una peticion de crear Student.
* En el mapper se le asigna la password a la Entidad y el role
* */
public record CreateStudentRequestDTO(
        Long id,
        String nid,
        String name,
        String email,
        String lastName,
        Career career,
        Integer semester,
        List<Subject> subjects){ // TODO: Preguntar si es mejor crearlos con un DTO dónde se mande el id y el nombre de la asignatura.
}
