package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.infrastructure.dao.ClassroomDAO;
import co.edu.cue.proyectonuclear.services.ClassroomService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@AllArgsConstructor//crea el contructor e inyecta depencia
public class ClassroomServiceImpl implements ClassroomService {
    private ClassroomDAO classrromDAO;
    @Override
    public Classroom saveClassroom(Classroom classroom) {
        return classroom;
    }
    @Override
    public List<Classroom> getAllClassroom() {
        return classrromDAO.getAllClassrrom();
    }

    @Override
    public Optional<Classroom> getAllById(Long id) {
        return Optional.of(classrromDAO.findCourseById(id));
    }



}