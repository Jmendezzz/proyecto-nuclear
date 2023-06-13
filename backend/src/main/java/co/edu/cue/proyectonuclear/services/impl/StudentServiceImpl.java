package co.edu.cue.proyectonuclear.services.impl;


import co.edu.cue.proyectonuclear.infrastructure.constrains.UserConstrain;
import co.edu.cue.proyectonuclear.infrastructure.dao.StudentDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;
import co.edu.cue.proyectonuclear.services.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentDAO studentDao;

    /**
     * This function returns a list of all students using the getAllStudents method from the
     * studentDAO object.
     *
     * @return A list of studentDTO objects is being returned.
     */
    @Override
    public List<StudentDTO> getAllStudent(){return studentDao.getAllStudent();}

    /**
     * This function returns an optional StudentDTO object by searching for a student with a given
     * NID.
     *
     * @param nid nid is a String parameter that represents the National Identification Number of a
     * student. This method is used to retrieve the details of a student based on their NID.
     * @return An Optional object that may contain a StudentDTO object if a student with the given
     * NID (National Identification Number) is found in the database, or an empty Optional object if no
     * such student is found.
     */
    @Override
    public Optional<StudentDTO> getStudentByNid(String nid){
        return studentDao.getStudentByNid(nid);
    }

    /**
     * This Java function saves a new professor and validates their user ID and subjects.
     *
     * @param createStudentRequestDTO  CreateStudentRequestDTO object that contains information about a new
     * student to be created.
     * @return The method is returning a StudentDTO object.
     */
    @Override
    public StudentDTO saveStudent(CreateStudentRequestDTO createStudentRequestDTO) {return studentDao.saveStudent(createStudentRequestDTO);}

    @Override
    public List<StudentDTO> getBySemester(Integer semester) {return studentDao.getBySemester(semester);}

    /**
     * This function updates a StudentDTO object using the updateStudent method from the
     * studentDAO object.
     *
     * @param studentDTO The parameter "studentDTO" is an object of type SStudentDTO, which contains
     * information about a students such as their name, email. This method is used to
     * update the information of a student in the database by passing the updated StudentDTO object
     * to the studentDAO.updateStudent() method.
     * @return The method `updateStudent` is returning a `StudentDTO` object.
     */
    @Override
    public StudentDTO updateStudent(StudentDTO studentDTO) {return studentDao.updateStudent(studentDTO);}

    /**
     * This function deletes a student from the database by their ID and returns a StudentDTO
     * object.
     *
     * @param id The parameter "id" is of type Long and represents the unique identifier of a Student
     * entity that needs to be deleted from the database.
     * @return A StudentDTO object is being returned. The method is calling the deleteStudent()
     * method from the studentDAO object and passing the id parameter to it. The deleteStudent()
     * method is expected to delete the student with the given id and return a StudentDTO object
     * representing the deleted student.
     */
    @Override
    public StudentDTO deleteStudent(Long id) {return studentDao.deleteStudent(id);}

    /**
     * This function returns an optional StudentDTO object by its ID using the studentDAO.
     *
     * @param id The parameter "id" is a Long data type representing the unique identifier of a
     * Student entity. This method retrieves the StudentDTO (Data Transfer Object) associated with
     * the given id from the database using the studentDAO (Data Access Object) and returns it as an
     * Optional object. If no StudentDTO is
     * @return An Optional object that may contain a StudentDTO object with the specified id.
     */
    @Override
    public Optional<StudentDTO> getStudentById(Long id) {
        return studentDao.getStudentById(id);
    }

    /**
     * This function returns a List StudentDTO object by its ID using the studentDAO.
     *
     * @param subjectId The parameter "subjectId" is a Long data type representing the unique identifier of a
     * subject. This method retrieves the StudentDTO (Data Transfer Object) associated with
     * the given subjectId from the database using the studentDAO (Data Access Object) and returns it as an
     * List.
     */
    @Override
    public List<StudentDTO> getStudentsBySubjectId(Long subjectId){

        return   studentDao.getStudentsBySubjectId(subjectId);

    }
}