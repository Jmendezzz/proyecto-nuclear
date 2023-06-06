package co.edu.cue.proyectonuclear.infrastructure.constrains;


import co.edu.cue.proyectonuclear.exceptions.ProfessorException;
import co.edu.cue.proyectonuclear.exceptions.UserException;
import co.edu.cue.proyectonuclear.infrastructure.dao.ProfessorDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestSubjectDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
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
/*
    public void validateProfessor(ProfessorDTO professorUpdate){
        Optional<ProfessorDTO> professorExisting = professorDAO.getProfessorById(professorUpdate.id());
        if (professorExisting.isEmpty()){
            throw new ProfessorException("No se pudo editar el profesor, se envia un profesor nulo",HttpStatus.BAD_REQUEST);

        }
    }*/

    public ProfessorDTO validateProfessorById(Long id){
        Optional<ProfessorDTO> professorExisting = professorDAO.getProfessorById(id);
        if (professorExisting.isEmpty()){
            throw new ProfessorException("Id incorrecto",HttpStatus.BAD_REQUEST);
        }else{
            return professorExisting.get();
        }
    }
}
