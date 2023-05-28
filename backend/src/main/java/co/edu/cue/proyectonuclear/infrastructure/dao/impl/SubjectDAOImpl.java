package co.edu.cue.proyectonuclear.infrastructure.dao.impl;

import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.infrastructure.dao.SubjectDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.SubjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
@AllArgsConstructor
public class SubjectDAOImpl implements SubjectDAO {

    @PersistenceContext
    EntityManager entityManager;
    SubjectMapper mapper;

    @Override
    public List<SubjectDTO> getAllSubjects() {
        String query = "FROM Subject";
        List<Subject> subjects = entityManager.createQuery(query).getResultList();
        return mapEntityList(subjects);
    }

    @Override
    public SubjectDTO getSubjectById(Long id) {
        Subject subject = entityManager.find(Subject.class, id);
        return mapper.mapFrom(subject);
    }

    @Override
    public List<SubjectDTO> getSubjectByCareer(Career career) {
        String query = "SELECT * FROM subject WHERE career = :career";
        Query nativeQuery = entityManager.createNativeQuery(query,Subject.class); //Importante poner Subject.class para hacer el mapeo automaticamente.
        nativeQuery.setParameter("career",career.name());
        List<Subject> subjects = nativeQuery.getResultList();
        return mapEntityList(subjects);
    }

    @Override
    public SubjectDTO createSubject(SubjectDTO subject) {
        Subject subjectEntity = mapper.mapFrom(subject);
        Subject subjectSaved=entityManager.merge(subjectEntity);
        return mapper.mapFrom(subjectSaved);
    }

    @Override
    public List<SubjectDTO> getSubjectByCareerAndSemester(Career career, Integer semesterNumber) {

        String query = "SELECT * FROM subject WHERE career = :career AND semester = :semester";
        Query nativeQuery = entityManager.createNativeQuery(query,Subject.class);
        nativeQuery.setParameter("career",career.name()); //Los ENUMS deben mandarse como String.
        nativeQuery.setParameter("semester",semesterNumber);
        return mapEntityList(nativeQuery.getResultList());
    }
/*
* En esta capa de DAO no se va manejar nada relacionado a la logica solo vamos a hacer operaciones
* con la base de datos, no vamos a comprobar si hay null ni nada de esos para eso está el servicio y controlador.
* */
    @Override
    public SubjectDTO updateSubject(SubjectDTO subject) {
        Subject subjectEntity = mapper.mapFrom(subject);
        System.out.println(subject.id());
        Subject subjectUpdated = entityManager.merge(subjectEntity);
        return mapper.mapFrom(subjectUpdated);
    }

    private List<SubjectDTO> mapEntityList(List<Subject>subjects){
        return subjects.parallelStream()
                .map(s-> mapper.mapFrom(s))
                .toList();
    }
}
