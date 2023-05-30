package co.edu.cue.proyectonuclear.infrastructure.constrains;

import co.edu.cue.proyectonuclear.exceptions.SubjectException;
import co.edu.cue.proyectonuclear.infrastructure.dao.ProfessorDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Optional;

@AllArgsConstructor
@Component
public class SubjectConstrain {

    private final ProfessorDAO professorDAO;

    public void validateSubjectIsAssigned(Long id){
        Optional<ProfessorDTO> professorDTO = professorDAO.getProfessorBySubject(id);
        if(professorDTO.isPresent()){
            ProfessorDTO professor= professorDTO.get();
            throw new SubjectException("No se ha podido eliminar la asignatura ya que está asociada con el profesor "
                    + professor.name()
                    +" "
                    + professor.lastName()
                    , HttpStatus.BAD_REQUEST);
        }
    }


}
