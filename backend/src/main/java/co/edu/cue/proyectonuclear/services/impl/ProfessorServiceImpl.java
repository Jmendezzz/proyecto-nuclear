package co.edu.cue.proyectonuclear.services.impl;


import co.edu.cue.proyectonuclear.infrastructure.constrains.ProfessorConstrain;
import co.edu.cue.proyectonuclear.infrastructure.constrains.UserConstrain;
import co.edu.cue.proyectonuclear.infrastructure.dao.ProfessorDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorScheduleDTO;
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
    public Optional<ProfessorDTO> getProfessorBySubjectId(Long idSubject) {
        return professorDAO.getProfessorBySubject(idSubject);
    }

    @Override
    public ProfessorDTO deleteProfessorById(Long id) {
        return professorDAO.deleteProfessor(id);
    }

    @Override
    public ProfessorDTO updateProfessor(ProfessorDTO professor) {
        return professorDAO.updateProfessor(professor);
    }

    @Override
    public ProfessorScheduleDTO setScheduleProfessor(Long id, ProfessorScheduleDTO professorScheduleDTO) {
        return professorDAO.setScheduleProfessor(id, professorScheduleDTO);
    }

    @Override
    public ProfessorDTO deleteScheduleProfessor(Long id, ProfessorScheduleDTO professorScheduleDTO) {
        return professorDAO.deleteScheduleProfessor(id, professorScheduleDTO);
    }

    @Override
    public ProfessorDTO saveProfessor(CreateProfessorRequestDTO professor) {
        userConstrain.validateNidUser(professor.nid());
        professorConstrain.validateSubjects(professor.subjects());
        return professorDAO.createProfessor(professor);
    }
}
