package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.exceptions.SubjectException;
import co.edu.cue.proyectonuclear.infrastructure.constrains.SubjectConstrain;
import co.edu.cue.proyectonuclear.infrastructure.dao.SubjectDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import co.edu.cue.proyectonuclear.services.SubjectService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class SubjectServiceImpl implements SubjectService {
    private final SubjectDAO subjectDAO;
    private final SubjectConstrain subjectConstrain;

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
    /**
     * Eliminar una asignatura.
     *
     * @param id de la asignatura a eliminar
     * @return asginatura eliminada.
     * @throws SubjectException si la asignatura está asociada con un profesor.
     */
    @Override
    public SubjectDTO deleteSubjectById(Long id) {
        subjectConstrain.validateSubjectIsAssigned(id);
        return subjectDAO.deleteSubjectById(id);
    }
}
