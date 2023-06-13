package co.edu.cue.proyectonuclear.services;

import co.edu.cue.proyectonuclear.domain.entities.ProfessorSchedule;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorScheduleDTO;

import java.util.List;
import java.util.Optional;

public interface ProfessorService {
    ProfessorDTO saveProfessor(CreateProfessorRequestDTO professor);
    List<ProfessorDTO> getAllProfessors();
    Optional<ProfessorDTO> getProfessorByNid(String nid);
    Optional<ProfessorDTO> getProfessorById(Long id);
    Optional<ProfessorDTO> getProfessorBySubjectId(Long idSubject);
    ProfessorDTO deleteProfessorById(Long id);
    ProfessorDTO updateProfessor(ProfessorDTO professor);
    ProfessorScheduleDTO setScheduleProfessor(Long id, ProfessorScheduleDTO professorScheduleDTO);
    ProfessorScheduleDTO deleteScheduleProfessor(Long idSchedule);
}
