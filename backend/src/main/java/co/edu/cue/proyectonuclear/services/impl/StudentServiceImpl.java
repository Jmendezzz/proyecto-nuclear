package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.exceptions.UserException;
import co.edu.cue.proyectonuclear.infrastructure.dao.StudentDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;
import co.edu.cue.proyectonuclear.services.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentDAO studentDao;
    @Override
    public List<StudentDTO> getAllStudent(){return studentDao.getAllStudent();}

    @Override
    public Optional<StudentDTO> getStudentById(Long id){
        return studentDao.getStudentById(id);
    }

    @Override //Recibimos el DTO para crear y se lo pasamos al DAO
    public StudentDTO saveStudent(CreateStudentRequestDTO createStudentRequestDTO) {
        if(studentDao.getStudentById(createStudentRequestDTO.id())==null){
            return studentDao.saveStudent(createStudentRequestDTO);
        }
        else throw new UserException("The id is unavailable", HttpStatus.BAD_REQUEST);
    }

    @Override
    public List<StudentDTO> getBySemester(Integer semester) {return studentDao.getBySemester(semester);}

    @Override
    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) { //TODO:the student just can update the password and email
        Optional<StudentDTO> studentToUpdate = studentDao.getStudentById(id);
        if (studentToUpdate != null){
            StudentDTO studentUpdate = new StudentDTO(
                    studentToUpdate.id(),
                    studentDTO.name(),
                    studentDTO.lastName(),
                    studentDTO.career(),
                    studentDTO.semester(),
                    studentDTO.subjects()
            );
            return studentDao.updateStudent(studentUpdate);
        }else return null;
    }

    @Override
    public StudentDTO deleteStudent(Long id) {
        Optional<StudentDTO> studentDTODelete = studentDao.getStudentById(id);
        if (studentDTODelete!=null){
            return studentDao.deleteStudent(id);
        }else return null;
    }
}
