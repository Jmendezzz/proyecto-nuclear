package co.edu.cue.proyectonuclear.services;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;

import java.util.List;
import java.util.Optional;

public interface ProfessorService {
    ProfessorDTO saveProfessor(ProfessorDTO professor);
    List<ProfessorDTO> getAllProfessors();
    Optional<ProfessorDTO> getProfessorById(Long id);
}
