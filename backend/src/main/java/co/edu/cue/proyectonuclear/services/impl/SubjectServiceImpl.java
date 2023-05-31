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
    /**
     * Obtener todas las asignaturas registradas.
     *
     * @return lista de DTO de subjects.
     */


    @Override
    public List<SubjectDTO> getAllSubjects() {
        return subjectDAO.getAllSubjects();
    }
    /**
     * Obtener una lista de asignaturas según la carrera.
     *
     * @param id el id de la carrera.
     * @return un Optional que será enviado al controlador.
     */


    @Override
    public Optional<SubjectDTO> getSubjectById(Long id) {
        return subjectDAO.getSubjectById(id);
    }
    /**
     * Obtener una lista de asignaturas según la carrera.
     *
     * @param career el enum de la carrera.
     * @return lista de asignaturas según la carrera.
     */

    @Override
    public List<SubjectDTO> getSubjectByCareer(Career career){
        return subjectDAO.getSubjectByCareer(career);
    }
    /**
     * Obtener una lista de asignaturas según la carrera y el numero de semestre.
     *
     * @param career el enum de la carrera.
     * @param semesterNumber el numero de semestre.
     * @return lista de asignaturas según la carrera y el numero de semestre.
     */

    @Override
    public List<SubjectDTO> getSubjectByCareerAndSemester(Career career, Integer semesterNumber) {
        return subjectDAO.getSubjectByCareerAndSemester(career,semesterNumber);
    }
    /**
     * Actualizar una asignatura existente.
     *
     * @param subjectDTO DTO que contiene la información de un subject actualizada proporcionada por el usuairo.
     * @return asginatura actualizada.
     * @throws SubjectException si el ID de la asignatura no es válido.
     */
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
