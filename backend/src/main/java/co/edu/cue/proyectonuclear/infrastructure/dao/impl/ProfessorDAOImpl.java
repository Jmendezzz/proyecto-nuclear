package co.edu.cue.proyectonuclear.infrastructure.dao.impl;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.infrastructure.dao.ProfessorDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.ProfessorMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
@Transactional
@AllArgsConstructor
public class ProfessorDAOImpl implements ProfessorDAO {
    @PersistenceContext
    EntityManager entityManager;
    ProfessorMapper mapper;
    @Override
    public List<ProfessorDTO> getAllProfessors() {
        String query = "FROM Professor";
        List<Professor> professors = entityManager.createQuery(query).getResultList();
        professors.stream().forEach(p-> System.out.println(p.getName()));
        return professors.stream()//Todo preguntar que paso ahi
                .map(p->mapper.mapFrom(p))
                .toList();
    }

    @Override
    public ProfessorDTO createProfessor(CreateProfessorRequestDTO professor) {
        Professor professorEntity = mapper.mapFromDTO(professor);
        Professor professorSaved =  entityManager.merge(professorEntity);
        return mapper.mapFrom(professorSaved);
    }

    @Override
    public ProfessorDTO getProfessorById(Long id) {
        Professor professor = entityManager.find(Professor.class, id);
        return mapper.mapFrom(professor);
    }

    @Override
    public ProfessorDTO getProfessorBySubject(Long idSubject) { //TODO: Una funcion que retorne una lista de asignaturas de un profesor.
        System.out.println(idSubject);
        String query = "SELECT p.* FROM professor p INNER JOIN professor_subjects ps ON p.id = ps.professor_id WHERE ps.subjects_id = :idSubject";
        Query nativeQuery = entityManager.createNativeQuery(query);
        nativeQuery.setParameter("idSubject", idSubject);
        try {
            Long idProfessor= (Long) nativeQuery.getSingleResult();
            return mapper.mapFrom(entityManager.find(Professor.class,idProfessor));
        }catch (NoResultException ex){
            return null;
        }
    }
}