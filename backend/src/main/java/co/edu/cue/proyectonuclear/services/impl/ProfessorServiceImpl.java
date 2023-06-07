package co.edu.cue.proyectonuclear.services.impl;


import co.edu.cue.proyectonuclear.infrastructure.constrains.ProfessorConstrain;
import co.edu.cue.proyectonuclear.infrastructure.constrains.UserConstrain;
import co.edu.cue.proyectonuclear.infrastructure.dao.ProfessorDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorScheduleDTO;
import co.edu.cue.proyectonuclear.services.ProfessorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * This is a Java service class for managing professors, which has dependencies on a DAO and two
 * constraint classes.
 */
@Service
@AllArgsConstructor
public class ProfessorServiceImpl implements ProfessorService {
    private final ProfessorDAO professorDAO;
    private final ProfessorConstrain professorConstrain;
    private final UserConstrain userConstrain;

    /**
     * This function returns a list of all professors using the getAllProfessors method from the
     * professorDAO object.
     * 
     * @return A list of ProfessorDTO objects is being returned.
     */
    @Override
    public List<ProfessorDTO> getAllProfessors() {
        return professorDAO.getAllProfessors();
    }

    /**
     * This function returns an optional ProfessorDTO object by searching for a professor with a given
     * NID.
     * 
     * @param nid nid is a String parameter that represents the National Identification Number of a
     * professor. This method is used to retrieve the details of a professor based on their NID.
     * @return An Optional object that may contain a ProfessorDTO object if a professor with the given
     * NID (National Identification Number) is found in the database, or an empty Optional object if no
     * such professor is found.
     */
    @Override
    public Optional<ProfessorDTO> getProfessorByNid(String nid) {
        return professorDAO.getProfessorByNid(nid);
    }

    /**
     * This function returns an optional ProfessorDTO object by its ID using the professorDAO.
     * 
     * @param id The parameter "id" is a Long data type representing the unique identifier of a
     * Professor entity. This method retrieves the ProfessorDTO (Data Transfer Object) associated with
     * the given id from the database using the professorDAO (Data Access Object) and returns it as an
     * Optional object. If no ProfessorDTO is
     * @return An Optional object that may contain a ProfessorDTO object with the specified id.
     */
    @Override
    public Optional<ProfessorDTO> getProfessorById(Long id) {
        return professorDAO.getProfessorById(id);
    }
    /**
     * This function returns an optional ProfessorDTO object by subject ID using the professorDAO.
     * 
     * @param idSubject The parameter idSubject is a Long data type representing the unique identifier
     * of a subject.
     * @return An Optional object that may contain a ProfessorDTO object if a professor is associated
     * with the given subject ID, or an empty Optional if no professor is associated with the given
     * subject ID.
     */
    @Override
    public Optional<ProfessorDTO> getProfessorBySubjectId(Long idSubject) {
        return professorDAO.getProfessorBySubject(idSubject);
    }

   /**
    * This function deletes a professor from the database by their ID and returns a ProfessorDTO
    * object.
    * 
    * @param id The parameter "id" is of type Long and represents the unique identifier of a Professor
    * entity that needs to be deleted from the database.
    * @return A ProfessorDTO object is being returned. The method is calling the deleteProfessor()
    * method from the professorDAO object and passing the id parameter to it. The deleteProfessor()
    * method is expected to delete the professor with the given id and return a ProfessorDTO object
    * representing the deleted professor.
    */
    @Override
    public ProfessorDTO deleteProfessorById(Long id) {
        return professorDAO.deleteProfessor(id);
    }

    /**
     * This function updates a ProfessorDTO object using the updateProfessor method from the
     * professorDAO object.
     * 
     * @param professor The parameter "professor" is an object of type ProfessorDTO, which contains
     * information about a professor such as their name, email, and department. This method is used to
     * update the information of a professor in the database by passing the updated ProfessorDTO object
     * to the professorDAO.updateProfessor() method.
     * @return The method `updateProfessor` is returning a `ProfessorDTO` object.
     */
    @Override
    public ProfessorDTO updateProfessor(ProfessorDTO professor) {
        return professorDAO.updateProfessor(professor);
    }

    /**
     * This function sets the schedule of a professor and returns a ProfessorScheduleDTO object.
     * 
     * @param id The ID of the professor whose schedule is being updated.
     * @param professorScheduleDTO ProfessorScheduleDTO is an object that contains the schedule
     * information for a professor. It may include details such as the professor's availability, class
     * timings, office hours, etc. The method setScheduleProfessor takes this object as input and
     * updates the schedule information for the professor with the given id. The method returns
     * @return The method is returning an object of type ProfessorScheduleDTO.
     */
    @Override
    public ProfessorScheduleDTO setScheduleProfessor(Long id, ProfessorScheduleDTO professorScheduleDTO) {
        return professorDAO.setScheduleProfessor(id, professorScheduleDTO);
    }

    /**
     * This function deletes a schedule for a professor and returns a ProfessorDTO object.
     * 
     * @param id The ID of the professor whose schedule is being deleted.
     * @param professorScheduleDTO The parameter `professorScheduleDTO` is an object of type
     * `ProfessorScheduleDTO` which contains information about a schedule for a professor. This object
     * likely includes details such as the date, time, and location of the professor's class or
     * appointment. The method `deleteScheduleProfessor` takes this object
     * @return The method `deleteScheduleProfessor` is returning a `ProfessorDTO` object.
     */
    @Override
    public ProfessorDTO deleteScheduleProfessor(Long id, ProfessorScheduleDTO professorScheduleDTO) {
        return professorDAO.deleteScheduleProfessor(id, professorScheduleDTO);
    }

    /**
     * This Java function saves a new professor and validates their user ID and subjects.
     * 
     * @param professor CreateProfessorRequestDTO object that contains information about a new
     * professor to be created.
     * @return The method is returning a ProfessorDTO object.
     */
    @Override
    public ProfessorDTO saveProfessor(CreateProfessorRequestDTO professor) {
        userConstrain.validateNidUser(professor.nid());
        professorConstrain.validateSubjects(professor.subjects());
        return professorDAO.createProfessor(professor);
    }
}
