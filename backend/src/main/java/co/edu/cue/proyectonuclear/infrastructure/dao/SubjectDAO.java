package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;

import java.util.List;

public interface SubjectDAO {
    List<SubjectDTO> getAllSubjects();
    SubjectDTO getSubjectById(Long id);
    List<SubjectDTO> getSubjectByCareer(Career career);
    SubjectDTO createSubject(SubjectDTO subject);

    List<SubjectDTO> getSubjectByCareerAndSemester(Career career, Integer semesterNumber);
}
