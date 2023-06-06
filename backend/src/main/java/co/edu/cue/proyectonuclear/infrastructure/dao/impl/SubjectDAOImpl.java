package co.edu.cue.proyectonuclear.infrastructure.dao.impl;

import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.exceptions.SubjectException;
import co.edu.cue.proyectonuclear.infrastructure.dao.SubjectDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.SubjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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
    public Optional<SubjectDTO> getSubjectById(Long id) {

        try{
            Subject subject = entityManager.find(Subject.class, id);
            return Optional.of(mapper.mapFrom(subject));

        }catch (NullPointerException ex){
            return Optional.empty();
        }

    }


    @Override
    public List<SubjectDTO> getSubjectByCareer(Career career) {
        String query = "SELECT * FROM subject WHERE career = :career";
        Query nativeQuery = entityManager.createNativeQuery(query,Subject.class);
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
    @Override
    public SubjectDTO updateSubject(SubjectDTO subject) {
        Subject subjectEntity = entityManager.find(Subject.class,subject.id());
        if(subjectEntity == null) throw new SubjectException("Can not update, the id:" + subject.id() + " does not exists", HttpStatus.BAD_REQUEST);
        subjectEntity.setName(subject.name());
        subjectEntity.setCareer(subject.career());
        subjectEntity.setSemester(subject.semester());
        subjectEntity.setCredits(subject.credits());
        subjectEntity.setAcademicHours(subject.academicHours());
        subjectEntity.setPeriod(subject.period());
        Subject subjectUpdated = entityManager.merge(subjectEntity);
        return mapper.mapFrom(subjectUpdated);
    }

    @Override
    public SubjectDTO deleteSubjectById(Long id)  {
        Subject subjectEntity =  entityManager.find(Subject.class, id);
        if(subjectEntity == null) throw new  SubjectException("Can not delete, the id:" + id + " does not exists", HttpStatus.BAD_REQUEST);
        entityManager.remove(subjectEntity);
        return mapper.mapFrom(subjectEntity);
    }

    private List<SubjectDTO> mapEntityList(List<Subject>subjects){
        return subjects.parallelStream()
                .map(s-> mapper.mapFrom(s))
                .toList();
    }
}
