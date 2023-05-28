package co.edu.cue.proyectonuclear.services;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;

import java.util.List;
import java.util.Optional;

public interface ProfessorService {
    ProfessorDTO saveProfessor(CreateProfessorRequestDTO professor);
    List<ProfessorDTO> getAllProfessors();
    ProfessorDTO getProfessorById(Long id);
}
