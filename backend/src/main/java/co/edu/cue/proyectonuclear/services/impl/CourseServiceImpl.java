package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.domain.entities.*;
import co.edu.cue.proyectonuclear.domain.enums.DayOfWeek;
import co.edu.cue.proyectonuclear.domain.enums.Period;
import co.edu.cue.proyectonuclear.infrastructure.constrains.CourseConstrain;
import co.edu.cue.proyectonuclear.infrastructure.dao.CourseDAO;
import co.edu.cue.proyectonuclear.infrastructure.utils.SubjectUtil;
import co.edu.cue.proyectonuclear.mapping.dtos.*;
import co.edu.cue.proyectonuclear.services.*;
import co.edu.cue.proyectonuclear.infrastructure.utils.TimeSlotUtil;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    public CourseDTO saveCourse(GenerateCourseDTO course) {
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
        return courseDAO.getCoursesByProfessorId(professorId);
    }

    @Override
    public List<CourseDTO> getCoursesByStudentId(Long id) {
        return courseDAO.getCoursesByStudentId(id);
    }

    @Override
    public List<GenerateCourseDTO> generateCourses(List<SubjectDTO> subjects) {

        List<GenerateCourseDTO> coursesDTO = new ArrayList<>();

            subjects.stream().forEach(subject -> {
            ProfessorDTO professorDTO = courseConstrain.validateSubjectIsAssignedToProfessor(subject); //Throws CourseException

            List<StudentDTO> students = courseConstrain.validateStudentsAssignedToSubject(subject); //Throws CourseException

            List<GenerateCourseScheduleDTO> courseSchedule = generateCourseSchedule(students,professorDTO,subject);

            LocalDate startDate =  generateCourseStartDate();

                GenerateCourseDTO generateCourseDTO = new GenerateCourseDTO(
                    professorDTO,
                    subject,
                    students,
                    courseSchedule,
                    startDate,
                    generateCourseEndDate(startDate)

            );
                courseDAO.saveCourse(generateCourseDTO);
        });
            return coursesDTO;
    }

    private List<GenerateCourseScheduleDTO> generateCourseSchedule(List<StudentDTO> students, ProfessorDTO professor, SubjectDTO subject) {
        Integer weeklyHours = SubjectUtil.getWeeklyHours(subject);

        courseConstrain.validateProfessorHasSufficientAvailableSchedule(professor, subject, weeklyHours);

        List<ProfessorScheduleDTO> professorSchedule = professor.schedule();

        List<GenerateCourseScheduleDTO> courseSchedules = new ArrayList<>();

        professorSchedule.stream().map(ps -> { //Iterating over each ProfessorSchedule

                    List<TimeSlot> possibleTimeSlots =
                            ps.timeSlots().stream()
                            .filter(timeSlot -> weeklyHours >= 9 ? TimeSlotUtil.between(timeSlot)>=3 : true )
                            .map(timeSlot -> TimeSlotUtil.splitTimeSlot(timeSlot, weeklyHours > 6 && subject.period().equals(Period.TRIMESTRAL) ? 3 : 2))//Splits the timeSlots
                            .flatMap(timeSlots -> timeSlots.stream())
                            .toList();

                    possibleTimeSlots.forEach(t-> {
                        System.out.println(t.getStartTime() + "-" + t.getEndTime());
                    });

                    Optional<TimeSlot> timeSlot =
                            possibleTimeSlots.stream()
                            .filter(ts ->
                                    !courseConstrain.validateCrossingScheduleTimeSlotForStudents(
                                            ps.day(),
                                            ts,
                                            students,
                                            subject
                                            )
                                            &&
                                            !courseConstrain.validateScheduleTimeSlotForProfessor(
                                                    ps.day(),
                                                    ts,
                                                    professor,
                                                    subject
                                            )
                            ).findFirst();

                    return timeSlot.map(slot -> new GenerateCourseScheduleDTO(
                            ps.day(),
                            findAvailableClassroom(ps.day(),slot,students),
                            slot
                    )).orElse(null);
                })
                .filter(cs -> cs != null && !courseConstrain.validateWeeklyHoursLimit(courseSchedules,weeklyHours)  )
                .forEach(courseSchedules::add);

        //TODO HERE: If the schedule missing to complete weeklyHours generate another until  everything its fine.

        return courseSchedules;
    }

    private ClassroomDTO findAvailableClassroom(DayOfWeek day, TimeSlot timeSlot, List<StudentDTO> students) {

        int studentsSize = students.size();

        Optional<ClassroomDTO> classroom =
                findSuitableClassrooms(studentsSize)
                        .stream()
                        .filter(
                                c ->
                                        !courseConstrain.validateClassroomAvailability(day, c, timeSlot)
                                                &&
                                                courseConstrain.validateClassroomLocation(day,c,timeSlot,students)
                        )
                        .findFirst();

        return classroom.orElse(null);

    }

    private List<ClassroomDTO> findSuitableClassrooms(int studentsNumber) {

        int maxAcceptableDifference = 0;

        //Set the max acceptable difference to choose the best classroom option.
        if (studentsNumber <= 20) maxAcceptableDifference = 8;

        if (studentsNumber <= 15) maxAcceptableDifference = 10;

        if ( studentsNumber <= 10) maxAcceptableDifference = 15;



        int finalMaxAcceptableDifference = maxAcceptableDifference;

        return classroomService.getAllClassroom()
                .stream()
                .filter(c -> c.capability() > studentsNumber
                        &&
                        c.capability() < studentsNumber + finalMaxAcceptableDifference)
                .toList();


    }

    private LocalDate generateCourseStartDate(){
        LocalDate localDate = LocalDate.now();
        if(localDate.getMonth().getValue() >= 6 ){
            return LocalDate.of(localDate.getYear(), 7,5);
        }else return LocalDate.of(localDate.getYear(),1,16);
    }

    private LocalDate generateCourseEndDate(LocalDate startDate){
        return LocalDate.of(startDate.getYear(), startDate.getMonth().getValue() + 5, startDate.getDayOfMonth()+15 );
    }


}
