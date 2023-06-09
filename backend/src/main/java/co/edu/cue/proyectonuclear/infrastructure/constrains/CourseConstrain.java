package co.edu.cue.proyectonuclear.infrastructure.constrains;

import co.edu.cue.proyectonuclear.domain.entities.TimeSlot;
import co.edu.cue.proyectonuclear.domain.enums.DayOfWeek;
import co.edu.cue.proyectonuclear.exceptions.CourseException;
import co.edu.cue.proyectonuclear.infrastructure.dao.CourseDAO;
import co.edu.cue.proyectonuclear.infrastructure.dao.ProfessorDAO;
import co.edu.cue.proyectonuclear.infrastructure.dao.StudentDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.*;
import co.edu.cue.proyectonuclear.infrastructure.utils.TimeSlotUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.sql.Time;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Component
public class CourseConstrain {

    private final CourseDAO courseDAO;

    private final ProfessorDAO professorDAO;
    private final StudentDAO studentDAO;

    public ProfessorDTO validateSubjectIsAssignedToProfessor(SubjectDTO subject) {
        Optional<ProfessorDTO> professor = professorDAO.getProfessorBySubject(subject.id());

        if (professor.isEmpty())
            throw new CourseException("La asignatura " + subject.name() + " no tiene asignado un profesor"
                    , HttpStatus.BAD_REQUEST);

        return professor.get();

    }

    public List<StudentDTO> validateStudentsAssignedToSubject(SubjectDTO subject) {
        List<StudentDTO> students = studentDAO.getStudentsBySubjectId(subject.id());

        if (students.size() == 0)
            throw new CourseException("La asignatura " + subject.name() + " no cuenta con estudiantes registrados"
                    , HttpStatus.BAD_REQUEST);

        return students;
    }

    public void validateProfessorHasSufficientAvailableSchedule(ProfessorDTO professorDTO, SubjectDTO subject, Integer weeklyHours) {
        List<TimeSlot> timeSlots =
                professorDTO.schedule()
                        .stream()
                        .flatMap(s -> s.timeSlots().stream())
                        .toList();


        List<Integer> hours =
                timeSlots.stream()
                        .map(ts -> TimeSlotUtil.between(ts)).
                        toList();

        Integer totalHours =
                hours
                        .stream()
                        .reduce(0, (total, current) -> total + current);

        if (weeklyHours > totalHours) throw new CourseException(
                "El profesor " + professorDTO.name() + " " + professorDTO.lastName() +
                        " no tiene la disponibilidad necesaria para dictar la materia: " + subject.name(), HttpStatus.BAD_REQUEST
        );
    }

    public boolean validateCrossingScheduleTimeSlotForStudents(DayOfWeek day, TimeSlot timeSlot, List<StudentDTO> students) {

        return students
                .stream()
                .map(student -> courseDAO.getCoursesByStudentId(student.id()))
                .flatMap(c -> c.stream())
                .flatMap(c -> c.courseSchedule().stream())
                .filter(c -> c.day().equals(day))
                .anyMatch(courseSchedule -> TimeSlotUtil.validateTimeCrossing(courseSchedule.timeSlot(), timeSlot));
    }

    public boolean validateScheduleTimeSlotForProfessor(DayOfWeek day, TimeSlot timeSlot, ProfessorDTO professor) {

        return courseDAO
                .getCoursesByProfessorId(professor.id())
                .stream()
                .flatMap(c -> c.courseSchedule().stream())
                .filter(cs -> cs.day().equals(day))
                .anyMatch(courseSchedule -> TimeSlotUtil.validateTimeCrossing(courseSchedule.timeSlot(), timeSlot));

    }

    public boolean validateClassroomAvailability(DayOfWeek day, ClassroomDTO classroom, TimeSlot timeSlot) {

        return courseDAO
                .getCoursesByClassroomId(classroom.id())
                .stream()
                .flatMap(c -> c.courseSchedule().stream())
                .filter(cs -> cs.day().equals(day))
                .anyMatch(courseSchedule -> TimeSlotUtil.validateTimeCrossing(courseSchedule.timeSlot(), timeSlot));
    }

    public boolean validateClassroomLocation(DayOfWeek day, ClassroomDTO classroom, TimeSlot timeSlot, List<StudentDTO> students) {

        return students.stream()
                .map(student -> courseDAO.getCoursesByStudentId(student.id()))
                .flatMap(c -> c.stream())
                .flatMap(c -> c.courseSchedule().stream())
                .filter(cs-> cs.day().equals(day))
                .filter(cs-> cs.timeSlot().getEndTime().getHour() == timeSlot.getStartTime().getHour())
                .noneMatch(cs-> cs.classroom().location().equals(classroom.location()));

    }
}
