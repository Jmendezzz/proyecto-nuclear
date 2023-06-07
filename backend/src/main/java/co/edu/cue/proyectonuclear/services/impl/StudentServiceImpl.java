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
    @Override
    public List<StudentDTO> getAllStudent(){return studentDao.getAllStudent();}

    @Override
    public Optional<StudentDTO> getStudentByNid(String nid){
        return studentDao.getStudentByNid(nid);
    }

    @Override
    public StudentDTO saveStudent(CreateStudentRequestDTO createStudentRequestDTO) {return studentDao.saveStudent(createStudentRequestDTO);}

    @Override
    public List<StudentDTO> getBySemester(Integer semester) {return studentDao.getBySemester(semester);}

    @Override
    public StudentDTO updateStudent(StudentDTO studentDTO) {return studentDao.updateStudent(studentDTO);}

    @Override
    public StudentDTO deleteStudent(Long id) {return studentDao.deleteStudent(id);}

    @Override
    public Optional<StudentDTO> getStudentById(Long id) {
        return studentDao.getStudentById(id);
    }

    @Override
    public List<StudentDTO> getStudentsBySubjectId(Long subjectId){

        return   studentDao.getStudentsBySubjectId(subjectId);

    }
}