package co.edu.cue.proyectonuclear.services;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;

import java.util.List;
import java.util.Optional;

public interface ProfessorService {
    Professor saveProfessor(Professor professor);
    List<ProfessorDTO> getAllProfessors();
    Optional<Professor> getProfessorById(Long id);
    void createCourses();

}
