package co.edu.cue.proyectonuclear.services;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.domain.enums.Element;

import java.util.List;
import java.util.Optional;

public interface ClassroomService {
    Classroom saveClassroom(Classroom classroom);
    List<Classroom> getAllClassroom();
    Optional<Classroom>getAllById(Long id);
}
