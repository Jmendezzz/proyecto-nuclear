package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.infrastructure.dao.SubjectDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import co.edu.cue.proyectonuclear.services.SubjectService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class SubjectServiceImpl implements SubjectService{
    private final SubjectDAO subjectDAO;

    @Override
    public SubjectDTO createSubject(SubjectDTO subjectDTO) {
        return subjectDAO.createSubject(subjectDTO);
    }

    @Override
    public List<SubjectDTO> getAllSubjects() {
        return subjectDAO.getAllSubjects();
    }

    @Override
    public Optional<SubjectDTO> getSubjectById(Long id) {
        return subjectDAO.getSubjectById(id);
    }

    @Override
    public List<SubjectDTO> getSubjectByCareer(Career career){
        return subjectDAO.getSubjectByCareer(career);
    }

    @Override
    public List<SubjectDTO> getSubjectByCareerAndSemester(Career career, Integer semesterNumber) {
        return subjectDAO.getSubjectByCareerAndSemester(career,semesterNumber);
    }
    @Override
    public SubjectDTO updateSubject(SubjectDTO subjectDTO) {
        return subjectDAO.updateSubject(subjectDTO);
    }

    @Override
    public SubjectDTO deleteSubjectById(Long id) {
        return subjectDAO.deleteSubjectById(id);
    }
}
