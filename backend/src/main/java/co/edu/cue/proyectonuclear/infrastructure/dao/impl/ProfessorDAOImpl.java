package co.edu.cue.proyectonuclear.infrastructure.dao.impl;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.domain.entities.ProfessorSchedule;
import co.edu.cue.proyectonuclear.exceptions.ProfessorException;
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
import org.springframework.http.HttpStatus;
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
    public ProfessorDTO deleteProfessor(Long id) {
        validateProfessorExisting(id);
        Professor professorEntity = entityManager.find(Professor.class, id);
        entityManager.remove(professorEntity);
        return mapper.mapFrom(professorEntity);

    }

    @Override
    public ProfessorDTO updateProfessor(ProfessorDTO professor) {
        validateProfessorExisting(professor.id());
        Professor professorEntity = mapper.mapFrom(professor);
        Professor professorSaved =  entityManager.merge(professorEntity);
        return mapper.mapFrom(professorSaved);
    }

    @Override
    public ProfessorScheduleDTO setScheduleProfessor(Long id, ProfessorScheduleDTO professorScheduleDTO) {
        Professor professorExisting = validateProfessorExistingEntity(id);

        validateTime(professorScheduleDTO);
        ProfessorSchedule professorSchedule = mapper.mapFrom(professorScheduleDTO);
        Boolean dayExists = false;
        for (ProfessorSchedule s : professorExisting.getSchedule()) {
            if (s.getDay().equals(professorScheduleDTO.day())) {
                s.getTimeSlots().clear();
                s.getTimeSlots().addAll(professorSchedule.getTimeSlots());
                dayExists = true;
                break;
            }
        }
        if (!dayExists) {
            professorExisting.getSchedule().add(professorSchedule);
        }
        entityManager.merge(professorExisting);
        return professorScheduleDTO;
    }

    @Override
    public ProfessorScheduleDTO deleteScheduleProfessor(Long idSchedule) {
        ProfessorSchedule professorSchedule = entityManager.find(ProfessorSchedule.class, idSchedule);
        entityManager.remove(professorSchedule);
        return mapper.mapFrom(professorSchedule);
    }

    private ProfessorDTO validateProfessorExisting(Long id){
        Optional<ProfessorDTO> professorExisting = getProfessorById(id);
        if (professorExisting.isEmpty()) throw new ProfessorException("ID incorrecto, no se encontró ningún profesor con id: "+id, HttpStatus.BAD_REQUEST);
        return professorExisting.get();
    }
    private Professor validateProfessorExistingEntity(Long id){
        Optional<Professor> professorExisting = Optional.of(entityManager.find(Professor.class, id));
        if (professorExisting.isEmpty()) throw new ProfessorException("ID incorrecto, no se encontró ningún profesor con id: "+id, HttpStatus.BAD_REQUEST);
        return professorExisting.get();
    }
    private void validateTime(ProfessorScheduleDTO professorScheduleDTO){
        professorScheduleDTO.timeSlots().forEach(ts->{
            if (ts.getStartTime().isAfter(ts.getEndTime())){
                throw new ProfessorException("El horario ingresado no es válido, la fecha de fin no puede ser antes de la de inicio.", HttpStatus.BAD_REQUEST);
            }
        });
    }
}