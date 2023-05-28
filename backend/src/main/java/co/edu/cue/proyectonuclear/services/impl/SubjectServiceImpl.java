package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.infrastructure.dao.SubjectDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import co.edu.cue.proyectonuclear.services.SubjectService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


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
    public SubjectDTO getSubjectById(Long id) {
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

    /*
    * Ya sabemos que en la capa de servicios no pueden ir Entidades.
    * Entonces lo primero que hacemos para modificar una entidad es comprobar si existe.
    * Si existe mandamos la entidad modificada que llego por el controlador.
    * Si no existe retornamos el null para que el controlador lo gestione.
    * */
    @Override
    public SubjectDTO updateSubject(Long id,SubjectDTO subjectDTO) {
        SubjectDTO subjectToUpdate = subjectDAO.getSubjectById(id);

        if(subjectToUpdate != null){
            SubjectDTO subjectUpdated = new SubjectDTO( //TODO: Preguntar dónde actualizar los datos de la entidad
                    subjectToUpdate.id(),
                    subjectDTO.name(),
                    subjectDTO.career(),
                    subjectDTO.semester(),
                    subjectDTO.credits()
            );
            return subjectDAO.updateSubject(subjectUpdated);
        }else{
            return  null;
        }
    }

    @Override
    public SubjectDTO deleteSubjectById(Long id) {
        SubjectDTO subjectToDelete = subjectDAO.getSubjectById(id);

        if(subjectToDelete != null){
            return subjectDAO.deleteSubjectById(id);
        }else{
            return null;
        }
    }
}
