package co.edu.cue.proyectonuclear.infrastructure.constrains;

import co.edu.cue.proyectonuclear.exceptions.ProfessorException;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorScheduleDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ProfessorScheduleConstrain {
    public void validateTime(ProfessorScheduleDTO professorScheduleDTO){
        professorScheduleDTO.timeSlots().forEach(ts->{
            if (ts.getStartTime().isAfter(ts.getEndTime())){
                throw new ProfessorException("El horario ingresado no es válido, la fecha de fin no puede ser antes de la de inicio.", HttpStatus.BAD_REQUEST);
            }
        });
    }
}
