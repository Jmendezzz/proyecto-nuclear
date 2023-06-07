package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.domain.entities.*;
import co.edu.cue.proyectonuclear.domain.enums.Period;
import co.edu.cue.proyectonuclear.infrastructure.constrains.CourseConstrain;
import co.edu.cue.proyectonuclear.infrastructure.dao.CourseDAO;
import co.edu.cue.proyectonuclear.infrastructure.dao.SubjectDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.*;
import co.edu.cue.proyectonuclear.services.*;
import co.edu.cue.proyectonuclear.utils.TimeSlotUtil;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseDAO courseDAO;
    private final ProfessorService professorService;
    private final SubjectService subjectService;
    private final StudentService studentService;
    private final ClassroomService classroomService;

    private final CourseConstrain courseConstrain;


    @Override
    public CourseDTO saveCourse(CourseDTO course) {
        return courseDAO.saveCourse(course);
    }

    @Override
    public List<CourseDTO> getAllCourses() {
        return courseDAO.getAllCourses();
    }

    @Override
    public Optional<CourseDTO> getCourseById(Long id) {
        return Optional.of(courseDAO.findCourseById(id));
    }

    @Override
    public List<CourseDTO> getCoursesByProfessorId(Long professorId) {
        return  courseDAO.getCoursesByProfessorId(professorId);
    }
    @Override
    public List<CourseStudentRequestDTO> getCoursesByStudentId(Long id) {
        return courseDAO.getCoursesByStudentId(id);
    }

    @Override
    public List<CourseDTO>  generateCourses() {

        List<CourseDTO> coursesDTO;

        subjectService.getAllSubjects().stream().forEach(subject ->{
            ProfessorDTO professorDTO = courseConstrain.validateSubjectIsAssignedToProfessor(subject); //Throws CourseException

            List<StudentDTO> students = courseConstrain.validateStudentsAssignedToSubject(subject); //Throws CourseException

        });
        return null;
    }

    private List<CourseScheduleDTO> generateCourseSchedule(List<StudentDTO> students,ProfessorDTO professor, SubjectDTO subject){


        Integer weeklyHours = (int)  Math.floor(subject.academicHours() / (subject.period().equals(Period.TRIMESTRAL) ? 10 :20));

        courseConstrain.validateProfessorHasSufficientAvailableSchedule(professor,subject,weeklyHours);

        Integer filledHours = 0;

        Integer maxHours = 3;

        List <ProfessorScheduleDTO> professorSchedule= professor.schedule();

        List<CourseScheduleDTO> courseSchedule = new ArrayList<>();

        while(filledHours!=weeklyHours){

            professorSchedule.stream().forEach(ps->{

                if(weeklyHours > 6){

                    List<TimeSlot> possibleTimeSlots =  ps.timeSlots().stream()
                            .filter( timeSlot -> TimeSlotUtil.between(timeSlot) >2)
                            .toList();

                }

            });


        }

    }

}
