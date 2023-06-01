package co.edu.cue.proyectonuclear.services.impl;


import co.edu.cue.proyectonuclear.infrastructure.constrains.ProfessorConstrain;
import co.edu.cue.proyectonuclear.infrastructure.constrains.UserConstrain;
import co.edu.cue.proyectonuclear.infrastructure.dao.ProfessorDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.services.ProfessorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProfessorServiceImpl implements ProfessorService {
    private final ProfessorDAO professorDAO;
    private final ProfessorConstrain professorConstrain;
    private final UserConstrain userConstrain;

    @Override
    public List<ProfessorDTO> getAllProfessors() {
        return professorDAO.getAllProfessors();
    }

    @Override
    public Optional<ProfessorDTO> getProfessorByNid(String nid) {
        return professorDAO.getProfessorByNid(nid);
    }

    @Override
    public Optional<ProfessorDTO> getProfessorById(Long id) {
        return professorDAO.getProfessorById(id);
    }

    @Override
    public ProfessorDTO deleteProfessorById(Long id) {
        ProfessorDTO professorDTO = professorConstrain.validateProfessorById(id);
        return professorDAO.deleteProfessor(professorDTO);
    }

    @Override
    public ProfessorDTO updateProfessor(ProfessorDTO professor) {
        professorConstrain.validateProfessor(professor);
        return professorDAO.updateProfessor(professor);
    }

    @Override
    public ProfessorDTO saveProfessor(CreateProfessorRequestDTO professor) {
        userConstrain.validateNidUser(professor.nid());
        professorConstrain.validateSubjects(professor.subjects());
        return professorDAO.createProfessor(professor);
    }
}
