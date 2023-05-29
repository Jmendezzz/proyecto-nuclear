package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.exceptions.UserException;
import co.edu.cue.proyectonuclear.infrastructure.dao.ProfessorDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.services.ProfessorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProfessorServiceImpl implements ProfessorService {
    private final ProfessorDAO professorDAO;

    @Override
    public List<ProfessorDTO> getAllProfessors() {
        return professorDAO.getAllProfessors();
    }

    @Override
    public ProfessorDTO getProfessorById(Long id) {
        return professorDAO.getProfessorById(id);
    }

    @Override
    public ProfessorDTO saveProfessor(CreateProfessorRequestDTO professor) {
        //TODO split the validations
        //Validate that the professor is unique for the subject
        professor.subjects().stream().forEach(s -> {
            if (professorDAO.getProfessorBySubject( s.id() )!= null) {
                System.out.println(s.name());
                throw new UserException("The subject "+ s.name() + " already has a professor");
            }
        });
        if(professorDAO.getProfessorById(professor.id()) == null) {
            return professorDAO.createProfessor(professor);
        }
        else{
            throw new UserException("The id is unavailable");
        }
    }
}
