package co.edu.cue.proyectonuclear.infrastructure.dao.impl;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.domain.entities.ProfessorSchedule;
import co.edu.cue.proyectonuclear.infrastructure.dao.ProfessorDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorScheduleDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.ProfessorMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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
        return mapper.mapFrom(professors);
    }

    @Override
    public ProfessorDTO createProfessor(CreateProfessorRequestDTO professor) {
        Professor professorEntity = mapper.mapFromDTO(professor);
        Professor professorSaved =  entityManager.merge(professorEntity);
        return mapper.mapFrom(professorSaved);
    }

    @Override
    public Optional<ProfessorDTO> getProfessorByNid(String nid) {
        String query = "SELECT u.* FROM professor p INNER JOIN user u ON p.id = u.id WHERE u.nid = :nidProfessor";
        Query nativeQuery = entityManager.createNativeQuery(query, Professor.class);
        nativeQuery.setParameter("nidProfessor", nid);
        try{
            Professor professor = (Professor) nativeQuery.getSingleResult();
            ProfessorDTO professorDTO = mapper.mapFrom(professor);
            return Optional.of(professorDTO);
        }catch (NoResultException ex){
            return Optional.empty();
        }
    }

    @Override
    public Optional<ProfessorDTO> getProfessorById(Long id) {
        try{
            Professor professor = entityManager.find(Professor.class, id);
            return Optional.of(mapper.mapFrom(professor));
        }catch (NullPointerException ex){
            return Optional.empty();
        }
    }

    @Override
    public Optional<ProfessorDTO> getProfessorBySubject(Long idSubject) {
        System.out.println(idSubject);
        String query = "SELECT p.* FROM professor p INNER JOIN professor_subjects ps ON p.id = ps.professor_id WHERE ps.subjects_id = :idSubject";
        Query nativeQuery = entityManager.createNativeQuery(query);
        nativeQuery.setParameter("idSubject", idSubject);
        try {
            Long idProfessor= (Long) nativeQuery.getSingleResult();
            return Optional.of(mapper.mapFrom(entityManager.find(Professor.class,idProfessor)));
        }catch (NoResultException ex){
            return Optional.empty();
        }
    }

    @Override
    public ProfessorDTO deleteProfessor(ProfessorDTO professorDTO) {
        Professor professorEntity = entityManager.find(Professor.class, professorDTO.id());
        entityManager.remove(professorEntity);
        return mapper.mapFrom(professorEntity);
    }

    @Override
    public ProfessorDTO updateProfessor(ProfessorDTO professor) {
        Professor professorEntity = mapper.mapFrom(professor);
        Professor professorSaved =  entityManager.merge(professorEntity);
        return mapper.mapFrom(professorSaved);
    }

    @Override
    public ProfessorScheduleDTO setScheduleProfessor(Long id, ProfessorScheduleDTO professorScheduleDTO) {
        ProfessorSchedule professorSchedule = mapper.mapFrom(professorScheduleDTO);
        Professor professor = entityManager.find(Professor.class, id);
        Boolean dayExists = false;
        for (ProfessorSchedule s : professor.getSchedule()) {
            if (s.getDay().equals(professorScheduleDTO.day())) {
                s.getTimeSlots().clear();
                s.getTimeSlots().addAll(professorSchedule.getTimeSlots());
                dayExists = true;
                break;
            }
        }
        if (!dayExists) {
            professor.getSchedule().add(professorSchedule);
        }
        entityManager.merge(professor);
        return professorScheduleDTO;
    }

    @Override
    public ProfessorDTO deleteScheduleProfessor(Long id, ProfessorScheduleDTO professorScheduleDTO) {
        Professor professor = entityManager.find(Professor.class, id);
        professor.getSchedule().forEach(s -> {
            if (s.getDay().equals(professorScheduleDTO.day())){
                s.getTimeSlots().clear();
            }
        });
        entityManager.merge(professor);
        return mapper.mapFrom(professor);
    }
}