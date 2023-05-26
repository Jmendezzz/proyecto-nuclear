package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;

import java.util.List;

public interface SubjectDAO {
    List<SubjectDTO> getAllSubjects();
    SubjectDTO getSubjectById(Long id);
    SubjectDTO createSubject(SubjectDTO subject);
}
