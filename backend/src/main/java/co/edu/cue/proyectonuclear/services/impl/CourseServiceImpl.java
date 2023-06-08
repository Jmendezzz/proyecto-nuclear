package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.domain.entities.*;
import co.edu.cue.proyectonuclear.domain.enums.Period;
import co.edu.cue.proyectonuclear.exceptions.CourseException;
import co.edu.cue.proyectonuclear.infrastructure.constrains.CourseConstrain;
import co.edu.cue.proyectonuclear.infrastructure.dao.CourseDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.*;
import co.edu.cue.proyectonuclear.services.*;
import co.edu.cue.proyectonuclear.infrastructure.utils.TimeSlotUtil;
import lombok.AllArgsConstructor;
import org.hibernate.event.spi.SaveOrUpdateEvent;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.sql.Time;
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
    public List<GenerateCourseDTO>  generateCourses() {

        List<GenerateCourseDTO> coursesDTO = new ArrayList<>();

        subjectService.getAllSubjects().stream().map(subject ->{
            ProfessorDTO professorDTO = courseConstrain.validateSubjectIsAssignedToProfessor(subject); //Throws CourseException

            List<StudentDTO> students = courseConstrain.validateStudentsAssignedToSubject(subject); //Throws CourseException

            return new GenerateCourseDTO(
                    professorDTO,
                    subject,
                    students,
                    generateCourseSchedule(students,professorDTO,subject)

            );

        }).forEach(c->coursesDTO.add(c));
        return  coursesDTO;
    }

    private List<GenerateCourseScheduleDTO> generateCourseSchedule(List<StudentDTO> students,ProfessorDTO professor, SubjectDTO subject){


        Integer weeklyHours = (int)  Math.floor(subject.academicHours() / (subject.period().equals(Period.TRIMESTRAL) ? 10 :20));

        courseConstrain.validateProfessorHasSufficientAvailableSchedule(professor,subject,weeklyHours);

        Integer filledHours = 0;

        Integer maxHours = 3;

        List <ProfessorScheduleDTO> professorSchedule= professor.schedule();

        List<GenerateCourseScheduleDTO> courseSchedules = new ArrayList<>();

            professorSchedule.stream().map(ps->{ //Iterating over each ProfessorSchedule

                if(weeklyHours > 6){
                    List<TimeSlot> possibleTimeSlots =  ps.timeSlots().stream()
                            .filter( timeSlot -> TimeSlotUtil.between(timeSlot) >2)
                            .map(timeSlot -> TimeSlotUtil.splitTimeSlot(timeSlot,3))
                            .flatMap(timeSlots -> timeSlots.stream())
                            .toList();

                    Optional<TimeSlot> timeSlot = possibleTimeSlots.stream()
                            .filter(ts-> !courseConstrain.validateCrossingScheduleTimeSlotForStudents(
                                    ps.day(),
                                    ts,
                                    students)
                            ).findFirst();

                    if(timeSlot.isPresent()){
                        System.out.println("TIME SLOT:"+ timeSlot.get().getEndTime());
                        return new GenerateCourseScheduleDTO(
                                ps.day(),
                                timeSlot.get()
                        );
                    }else{
                        return  null;

                    }


                }
                else {
                    return null;
                }
            }).filter(cs->cs!=null).forEach(cs->courseSchedules.add(cs));

        System.out.println("SIZE:" + courseSchedules.size());

        return courseSchedules;

    }

}
