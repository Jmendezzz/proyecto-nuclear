package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;

public class ProfessorMapperImpl implements ProfessorMapper{

    @Override
    public Professor mapToEntity(ProfessorDTO dto) {
        Professor professor = new Professor();
        return professor;
    }

    @Override
    public ProfessorDTO mapToDTO(Professor professor) {
        return null;
    }
}
