package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
@Transactional
public class ProfessorDAOImpl implements ProfessorDAO{
    @PersistenceContext
    EntityManager entityManager;
    @Override
    public List<Professor> getAllProfessors() {
        String query = "FROM Professor";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Professor saveProfessor(Professor professor) {
        return entityManager.merge(professor);
    }

    @Override
    public Professor getProfessorById(Long id) {
        return entityManager.find(Professor.class, id);
    }
}