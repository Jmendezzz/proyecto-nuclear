package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.domain.entities.Student;
import co.edu.cue.proyectonuclear.infrastructure.dao.StudentDAO;
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
    public Optional<StudentDTO> getStudentById(Long id){return studentDao.getStudentById(id);}

    @Override
    public StudentDTO saveStudent(StudentDTO student) {return studentDao.saveStudent(student);}

    @Override
    public List<StudentDTO> getBySemester(Integer semester) {
        return studentDao.getBySemester(semester);
    }
}
