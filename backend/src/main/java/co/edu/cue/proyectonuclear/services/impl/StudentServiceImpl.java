package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.exceptions.UserException;
import co.edu.cue.proyectonuclear.infrastructure.constrains.UserConstrain;
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
    private final UserConstrain userConstrain;
    @Override
    public List<StudentDTO> getAllStudent(){return studentDao.getAllStudent();}

    @Override
    public Optional<StudentDTO> getStudentByNid(String nid){
        return studentDao.getStudentByNid(nid);
    }

    @Override //Recibimos el DTO para crear y se lo pasamos al DAO
    public StudentDTO saveStudent(CreateStudentRequestDTO createStudentRequestDTO) {
        userConstrain.validateNidUser(createStudentRequestDTO.nid());
        return studentDao.saveStudent(createStudentRequestDTO);
    }

    @Override
    public List<StudentDTO> getBySemester(Integer semester) {return studentDao.getBySemester(semester);}

    @Override
    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) { //TODO:the student just can update the password and email
        return studentDao.updateStudent(studentDTO);
    }

    @Override
    public StudentDTO deleteStudent(Long id) {
        Optional<StudentDTO> studentDTODelete = studentDao.getStudentById(id);
        if (studentDTODelete.isPresent()){
            return studentDao.deleteStudent(id);
        }else return null;
    }

    @Override
    public Optional<StudentDTO> getStudentById(Long id) {
        return studentDao.getStudentById(id);
    }
}
