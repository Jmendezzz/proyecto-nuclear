package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Professor;

import java.util.List;

public interface ProfessorDAO {
    List<Professor> getAllProfessors();
    Professor saveProfessor(Professor professor);
    Professor getProfessorById(Long id);

}