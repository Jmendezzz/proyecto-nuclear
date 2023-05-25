package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.domain.entities.Course;

import java.util.List;

public interface ClassroomDAO {
    List<Classroom> getAllClassrrom();
    Classroom createClassroom(Classroom classroom);
    Classroom findCourseById(Long id);
}
