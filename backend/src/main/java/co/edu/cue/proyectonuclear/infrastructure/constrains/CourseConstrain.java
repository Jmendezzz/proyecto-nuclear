package co.edu.cue.proyectonuclear.infrastructure.constrains;

import co.edu.cue.proyectonuclear.exceptions.CourseException;
import co.edu.cue.proyectonuclear.infrastructure.dao.ProfessorDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Optional;

@AllArgsConstructor
@Component
public class CourseConstrain {

    private final ProfessorDAO professorDAO;

    public ProfessorDTO validateSubjectIsAssignedToProfessor(SubjectDTO subject){
        Optional<ProfessorDTO> professor = professorDAO.getProfessorBySubject(subject.id());

        if(professor.isEmpty()) throw new CourseException("La asignatura "+ subject.name() + " no tiene asignado un profesor"
                , HttpStatus.BAD_REQUEST );

        return professor.get();

    }

}
