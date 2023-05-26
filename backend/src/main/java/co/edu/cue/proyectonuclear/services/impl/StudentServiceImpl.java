package co.edu.cue.proyectonuclear.services.impl;

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
    @Override
    public List<StudentDTO> getAllStudent(){return studentDao.getAllStudent();}

    @Override
    public Optional<StudentDTO> getStudentById(Long id){
        return Optional.of(studentDao.getStudentById(id));
    }

    @Override //Recibimos el DTO para crear y se lo pasamos al DAO
    public StudentDTO saveStudent(CreateStudentRequestDTO createStudentRequestDTO) {return studentDao.saveStudent(createStudentRequestDTO);}

    @Override
    public List<StudentDTO> getBySemester(Integer semester) {return studentDao.getBySemester(semester);}
}
