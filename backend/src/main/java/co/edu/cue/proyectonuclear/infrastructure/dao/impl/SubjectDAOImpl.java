package co.edu.cue.proyectonuclear.infrastructure.dao.impl;

import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.infrastructure.dao.SubjectDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.SubjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public class SubjectDAOImpl implements SubjectDAO {

    @PersistenceContext
    EntityManager entityManager;
    SubjectMapper mapper;

    @Override
    public List<SubjectDTO> getAllSubjects() {
        String query = "FROM Subject"; //ALERT table name?
        List<Subject> subjects = entityManager.createQuery(query).getResultList();
        return subjects.parallelStream()
                .map(s->mapper.mapFrom(s))
                .toList();
    }

    @Override
    public SubjectDTO getSubjectById(Long id) {
        Subject subject = entityManager.find(Subject.class, id);
        return mapper.mapFrom(subject);
    }

    @Override
    public SubjectDTO createSubject(SubjectDTO subject) {
        Subject subjectEntity = mapper.mapFrom(subject);
        entityManager.merge(subjectEntity);
        return mapper.mapFrom(subjectEntity);
    }
}
