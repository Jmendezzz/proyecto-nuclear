package co.edu.cue.proyectonuclear.infrastructure.constrains;


import co.edu.cue.proyectonuclear.exceptions.ProfessorException;
import co.edu.cue.proyectonuclear.exceptions.UserException;
import co.edu.cue.proyectonuclear.infrastructure.dao.ProfessorDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestSubjectDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorScheduleDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@AllArgsConstructor
public class ProfessorConstrain {
    private final ProfessorDAO professorDAO;
    public void  validateSubjects(List<CreateProfessorRequestSubjectDTO> subjects){
        subjects.forEach(s->{
            if (professorDAO.getProfessorBySubject(s.id()).isPresent()) {
                System.out.println(s.name());
                throw new UserException("La materia "+ s.name() + " ya cuenta con profesor", HttpStatus.BAD_REQUEST);
            }
        });
    }

    public void validateTimeSlotsPerWeek(Long id, ProfessorScheduleDTO professorScheduleDTO){
        Optional<ProfessorDTO> professor = professorDAO.getProfessorById(id);
        if (professor.isEmpty()) throw new ProfessorException("ID inválido", HttpStatus.BAD_REQUEST);
        professor.get().subjects().forEach();
    }

}
