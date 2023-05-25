package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;

public interface ProfessorMapper {
    Professor mapToEntity(ProfessorDTO dto);
    ProfessorDTO mapToDTO(Professor professor);
}
