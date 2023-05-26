package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.infrastructure.dao.ClassroomDAO;
import co.edu.cue.proyectonuclear.infrastructure.dao.CourseDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.services.ClassroomService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@AllArgsConstructor//crea el contructor e inyecta depencia
public class ClassroomServiceImpl implements ClassroomService {
    private final ClassroomDAO classroomDAO;


    @Override
    public ClassroomDTO saveClassroom(ClassroomDTO classroom) {
        return classroomDAO.saveCourse(classroom);
    }

    @Override
    public List<ClassroomDTO> getAllClassroom() {
        return classroomDAO.getAllClassrrom();
    }

    @Override
    public Optional<ClassroomDTO> getClassroomById(Long id) {
        return Optional.of(classroomDAO.findCourseById(id));
    }
}
