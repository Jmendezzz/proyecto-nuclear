package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.infrastructure.dao.ProfessorDAO;
import co.edu.cue.proyectonuclear.services.ProfessorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProfessorServiceImpl implements ProfessorService {
    private final ProfessorDAO professorDAO;
    @Override
    public Professor saveProfessor(Professor professor) {
        return professorDAO.saveProfessor(professor);
    }

    @Override
    public List<Professor> getAllProfessor() {
        return null;
    }

    @Override
    public Optional<Professor> getProfessorById(Long id) {
        return Optional.empty();
    }

    @Override
    public void createCourses() {

    }
}
