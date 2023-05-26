package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.ProfessorMapper;
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
    ProfessorMapper mapper;
    @Override
    public List<ProfessorDTO> getAllProfessors() {
        String query = "FROM Professor";
        List<Professor> professors = entityManager.createQuery(query).getResultList();
        return professors.parallelStream()
                .map(p->mapper.mapFrom(p))
                .toList();
    }

    @Override
    public ProfessorDTO createProfessor(ProfessorDTO professor) {
        Professor professorEntity = mapper.mapFrom(professor);
        entityManager.merge(professor);
        return mapper.mapFrom(professorEntity);
    }

    @Override
    public ProfessorDTO getProfessorById(Long id) {
        Professor professor = entityManager.find(Professor.class, id);
        return mapper.mapFrom(professor);
    }
}