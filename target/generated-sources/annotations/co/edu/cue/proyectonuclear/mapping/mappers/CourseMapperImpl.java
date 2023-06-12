package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.domain.entities.CourseSchedule;
import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.domain.entities.ProfessorSchedule;
import co.edu.cue.proyectonuclear.domain.entities.Student;
import co.edu.cue.proyectonuclear.domain.entities.Subject;
import co.edu.cue.proyectonuclear.domain.entities.TimeSlot;
import co.edu.cue.proyectonuclear.domain.enums.Career;
import co.edu.cue.proyectonuclear.domain.enums.DayOfWeek;
import co.edu.cue.proyectonuclear.domain.enums.Element;
import co.edu.cue.proyectonuclear.domain.enums.Location;
import co.edu.cue.proyectonuclear.domain.enums.Period;
import co.edu.cue.proyectonuclear.domain.enums.Tipology;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseScheduleDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.GenerateCourseDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.GenerateCourseScheduleDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorScheduleDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-11T21:03:13-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class CourseMapperImpl implements CourseMapper {

    @Override
    public CourseDTO mapFromEntity(Course course) {
        if ( course == null ) {
            return null;
        }

        Long id = null;
        ProfessorDTO professor = null;
        SubjectDTO subject = null;
        List<StudentDTO> students = null;
        List<CourseScheduleDTO> courseSchedule = null;

        id = course.getId();
        professor = professorToProfessorDTO( course.getProfessor() );
        subject = subjectToSubjectDTO( course.getSubject() );
        students = studentListToStudentDTOList( course.getStudents() );
        courseSchedule = courseScheduleListToCourseScheduleDTOList( course.getCourseSchedule() );

        CourseDTO courseDTO = new CourseDTO( id, professor, subject, students, courseSchedule );

        return courseDTO;
    }

    @Override
    public Course mapFromDTO(CourseDTO courseDTO) {
        if ( courseDTO == null ) {
            return null;
        }

        Course course = new Course();

        course.setId( courseDTO.id() );
        course.setProfessor( professorDTOToProfessor( courseDTO.professor() ) );
        course.setSubject( subjectDTOToSubject( courseDTO.subject() ) );
        course.setStudents( studentDTOListToStudentList( courseDTO.students() ) );
        course.setCourseSchedule( courseScheduleDTOListToCourseScheduleList( courseDTO.courseSchedule() ) );

        return course;
    }

    @Override
    public List<CourseDTO> mapFromEntity(List<Course> courses) {
        if ( courses == null ) {
            return null;
        }

        List<CourseDTO> list = new ArrayList<CourseDTO>( courses.size() );
        for ( Course course : courses ) {
            list.add( mapFromEntity( course ) );
        }

        return list;
    }

    @Override
    public CourseStudentRequestDTO mapStudentRequestFromEntity(Course course) {
        if ( course == null ) {
            return null;
        }

        Professor professor = null;
        Subject subject = null;
        List<CourseScheduleDTO> courseSchedule = null;

        professor = course.getProfessor();
        subject = course.getSubject();
        courseSchedule = courseScheduleListToCourseScheduleDTOList( course.getCourseSchedule() );

        CourseStudentRequestDTO courseStudentRequestDTO = new CourseStudentRequestDTO( professor, subject, courseSchedule );

        return courseStudentRequestDTO;
    }

    @Override
    public Course mapFromGenerateDTO(GenerateCourseDTO course) {
        if ( course == null ) {
            return null;
        }

        Course course1 = new Course();

        course1.setProfessor( professorDTOToProfessor( course.professor() ) );
        course1.setSubject( subjectDTOToSubject( course.subject() ) );
        course1.setStudents( studentDTOListToStudentList( course.students() ) );
        course1.setStartDate( course.startDate() );
        course1.setEndDate( course.endDate() );
        course1.setCourseSchedule( generateCourseScheduleDTOListToCourseScheduleList( course.courseSchedule() ) );

        return course1;
    }

    protected ProfessorScheduleDTO professorScheduleToProfessorScheduleDTO(ProfessorSchedule professorSchedule) {
        if ( professorSchedule == null ) {
            return null;
        }

        Long id = null;
        DayOfWeek day = null;
        List<TimeSlot> timeSlots = null;

        id = professorSchedule.getId();
        day = professorSchedule.getDay();
        List<TimeSlot> list = professorSchedule.getTimeSlots();
        if ( list != null ) {
            timeSlots = new ArrayList<TimeSlot>( list );
        }

        ProfessorScheduleDTO professorScheduleDTO = new ProfessorScheduleDTO( id, day, timeSlots );

        return professorScheduleDTO;
    }

    protected List<ProfessorScheduleDTO> professorScheduleListToProfessorScheduleDTOList(List<ProfessorSchedule> list) {
        if ( list == null ) {
            return null;
        }

        List<ProfessorScheduleDTO> list1 = new ArrayList<ProfessorScheduleDTO>( list.size() );
        for ( ProfessorSchedule professorSchedule : list ) {
            list1.add( professorScheduleToProfessorScheduleDTO( professorSchedule ) );
        }

        return list1;
    }

    protected SubjectDTO subjectToSubjectDTO(Subject subject) {
        if ( subject == null ) {
            return null;
        }

        Long id = null;
        String name = null;
        Career career = null;
        Integer academicHours = null;
        Period period = null;
        Integer semester = null;
        Integer credits = null;

        id = subject.getId();
        name = subject.getName();
        career = subject.getCareer();
        academicHours = subject.getAcademicHours();
        period = subject.getPeriod();
        semester = subject.getSemester();
        credits = subject.getCredits();

        SubjectDTO subjectDTO = new SubjectDTO( id, name, career, academicHours, period, semester, credits );

        return subjectDTO;
    }

    protected List<SubjectDTO> subjectListToSubjectDTOList(List<Subject> list) {
        if ( list == null ) {
            return null;
        }

        List<SubjectDTO> list1 = new ArrayList<SubjectDTO>( list.size() );
        for ( Subject subject : list ) {
            list1.add( subjectToSubjectDTO( subject ) );
        }

        return list1;
    }

    protected ProfessorDTO professorToProfessorDTO(Professor professor) {
        if ( professor == null ) {
            return null;
        }

        Long id = null;
        String nid = null;
        String name = null;
        String lastName = null;
        String email = null;
        List<ProfessorScheduleDTO> schedule = null;
        List<SubjectDTO> subjects = null;

        id = professor.getId();
        nid = professor.getNid();
        name = professor.getName();
        lastName = professor.getLastName();
        email = professor.getEmail();
        schedule = professorScheduleListToProfessorScheduleDTOList( professor.getSchedule() );
        subjects = subjectListToSubjectDTOList( professor.getSubjects() );

        ProfessorDTO professorDTO = new ProfessorDTO( id, nid, name, lastName, email, schedule, subjects );

        return professorDTO;
    }

    protected StudentDTO studentToStudentDTO(Student student) {
        if ( student == null ) {
            return null;
        }

        Long id = null;
        String nid = null;
        String name = null;
        String lastName = null;
        String email = null;
        Career career = null;
        Integer semester = null;
        List<Subject> subjects = null;

        id = student.getId();
        nid = student.getNid();
        name = student.getName();
        lastName = student.getLastName();
        email = student.getEmail();
        career = student.getCareer();
        semester = student.getSemester();
        List<Subject> list = student.getSubjects();
        if ( list != null ) {
            subjects = new ArrayList<Subject>( list );
        }

        StudentDTO studentDTO = new StudentDTO( id, nid, name, lastName, email, career, semester, subjects );

        return studentDTO;
    }

    protected List<StudentDTO> studentListToStudentDTOList(List<Student> list) {
        if ( list == null ) {
            return null;
        }

        List<StudentDTO> list1 = new ArrayList<StudentDTO>( list.size() );
        for ( Student student : list ) {
            list1.add( studentToStudentDTO( student ) );
        }

        return list1;
    }

    protected ClassroomDTO classroomToClassroomDTO(Classroom classroom) {
        if ( classroom == null ) {
            return null;
        }

        Long id = null;
        String name = null;
        Location location = null;
        Integer capability = null;
        List<Element> elements = null;
        Tipology tipology = null;

        id = classroom.getId();
        name = classroom.getName();
        location = classroom.getLocation();
        capability = classroom.getCapability();
        List<Element> list = classroom.getElements();
        if ( list != null ) {
            elements = new ArrayList<Element>( list );
        }
        tipology = classroom.getTipology();

        ClassroomDTO classroomDTO = new ClassroomDTO( id, name, location, capability, elements, tipology );

        return classroomDTO;
    }

    protected CourseScheduleDTO courseScheduleToCourseScheduleDTO(CourseSchedule courseSchedule) {
        if ( courseSchedule == null ) {
            return null;
        }

        Long id = null;
        ClassroomDTO classroom = null;
        DayOfWeek day = null;
        TimeSlot timeSlot = null;

        id = courseSchedule.getId();
        classroom = classroomToClassroomDTO( courseSchedule.getClassroom() );
        day = courseSchedule.getDay();
        timeSlot = courseSchedule.getTimeSlot();

        CourseScheduleDTO courseScheduleDTO = new CourseScheduleDTO( id, classroom, day, timeSlot );

        return courseScheduleDTO;
    }

    protected List<CourseScheduleDTO> courseScheduleListToCourseScheduleDTOList(List<CourseSchedule> list) {
        if ( list == null ) {
            return null;
        }

        List<CourseScheduleDTO> list1 = new ArrayList<CourseScheduleDTO>( list.size() );
        for ( CourseSchedule courseSchedule : list ) {
            list1.add( courseScheduleToCourseScheduleDTO( courseSchedule ) );
        }

        return list1;
    }

    protected ProfessorSchedule professorScheduleDTOToProfessorSchedule(ProfessorScheduleDTO professorScheduleDTO) {
        if ( professorScheduleDTO == null ) {
            return null;
        }

        ProfessorSchedule professorSchedule = new ProfessorSchedule();

        professorSchedule.setId( professorScheduleDTO.id() );
        professorSchedule.setDay( professorScheduleDTO.day() );
        List<TimeSlot> list = professorScheduleDTO.timeSlots();
        if ( list != null ) {
            professorSchedule.setTimeSlots( new ArrayList<TimeSlot>( list ) );
        }

        return professorSchedule;
    }

    protected List<ProfessorSchedule> professorScheduleDTOListToProfessorScheduleList(List<ProfessorScheduleDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<ProfessorSchedule> list1 = new ArrayList<ProfessorSchedule>( list.size() );
        for ( ProfessorScheduleDTO professorScheduleDTO : list ) {
            list1.add( professorScheduleDTOToProfessorSchedule( professorScheduleDTO ) );
        }

        return list1;
    }

    protected Subject subjectDTOToSubject(SubjectDTO subjectDTO) {
        if ( subjectDTO == null ) {
            return null;
        }

        Subject subject = new Subject();

        subject.setId( subjectDTO.id() );
        subject.setName( subjectDTO.name() );
        subject.setAcademicHours( subjectDTO.academicHours() );
        subject.setCareer( subjectDTO.career() );
        subject.setPeriod( subjectDTO.period() );
        subject.setSemester( subjectDTO.semester() );
        subject.setCredits( subjectDTO.credits() );

        return subject;
    }

    protected List<Subject> subjectDTOListToSubjectList(List<SubjectDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<Subject> list1 = new ArrayList<Subject>( list.size() );
        for ( SubjectDTO subjectDTO : list ) {
            list1.add( subjectDTOToSubject( subjectDTO ) );
        }

        return list1;
    }

    protected Professor professorDTOToProfessor(ProfessorDTO professorDTO) {
        if ( professorDTO == null ) {
            return null;
        }

        Professor professor = new Professor();

        professor.setId( professorDTO.id() );
        professor.setNid( professorDTO.nid() );
        professor.setName( professorDTO.name() );
        professor.setLastName( professorDTO.lastName() );
        professor.setEmail( professorDTO.email() );
        professor.setSchedule( professorScheduleDTOListToProfessorScheduleList( professorDTO.schedule() ) );
        professor.setSubjects( subjectDTOListToSubjectList( professorDTO.subjects() ) );

        return professor;
    }

    protected Student studentDTOToStudent(StudentDTO studentDTO) {
        if ( studentDTO == null ) {
            return null;
        }

        Student student = new Student();

        student.setId( studentDTO.id() );
        student.setNid( studentDTO.nid() );
        student.setName( studentDTO.name() );
        student.setLastName( studentDTO.lastName() );
        student.setEmail( studentDTO.email() );
        List<Subject> list = studentDTO.subjects();
        if ( list != null ) {
            student.setSubjects( new ArrayList<Subject>( list ) );
        }
        student.setSemester( studentDTO.semester() );
        student.setCareer( studentDTO.career() );

        return student;
    }

    protected List<Student> studentDTOListToStudentList(List<StudentDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<Student> list1 = new ArrayList<Student>( list.size() );
        for ( StudentDTO studentDTO : list ) {
            list1.add( studentDTOToStudent( studentDTO ) );
        }

        return list1;
    }

    protected Classroom classroomDTOToClassroom(ClassroomDTO classroomDTO) {
        if ( classroomDTO == null ) {
            return null;
        }

        Classroom classroom = new Classroom();

        classroom.setId( classroomDTO.id() );
        classroom.setName( classroomDTO.name() );
        classroom.setLocation( classroomDTO.location() );
        classroom.setCapability( classroomDTO.capability() );
        List<Element> list = classroomDTO.elements();
        if ( list != null ) {
            classroom.setElements( new ArrayList<Element>( list ) );
        }
        classroom.setTipology( classroomDTO.tipology() );

        return classroom;
    }

    protected CourseSchedule courseScheduleDTOToCourseSchedule(CourseScheduleDTO courseScheduleDTO) {
        if ( courseScheduleDTO == null ) {
            return null;
        }

        CourseSchedule courseSchedule = new CourseSchedule();

        courseSchedule.setId( courseScheduleDTO.id() );
        courseSchedule.setClassroom( classroomDTOToClassroom( courseScheduleDTO.classroom() ) );
        courseSchedule.setDay( courseScheduleDTO.day() );
        courseSchedule.setTimeSlot( courseScheduleDTO.timeSlot() );

        return courseSchedule;
    }

    protected List<CourseSchedule> courseScheduleDTOListToCourseScheduleList(List<CourseScheduleDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<CourseSchedule> list1 = new ArrayList<CourseSchedule>( list.size() );
        for ( CourseScheduleDTO courseScheduleDTO : list ) {
            list1.add( courseScheduleDTOToCourseSchedule( courseScheduleDTO ) );
        }

        return list1;
    }

    protected CourseSchedule generateCourseScheduleDTOToCourseSchedule(GenerateCourseScheduleDTO generateCourseScheduleDTO) {
        if ( generateCourseScheduleDTO == null ) {
            return null;
        }

        CourseSchedule courseSchedule = new CourseSchedule();

        courseSchedule.setClassroom( classroomDTOToClassroom( generateCourseScheduleDTO.classroom() ) );
        courseSchedule.setDay( generateCourseScheduleDTO.day() );
        courseSchedule.setTimeSlot( generateCourseScheduleDTO.timeSlot() );

        return courseSchedule;
    }

    protected List<CourseSchedule> generateCourseScheduleDTOListToCourseScheduleList(List<GenerateCourseScheduleDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<CourseSchedule> list1 = new ArrayList<CourseSchedule>( list.size() );
        for ( GenerateCourseScheduleDTO generateCourseScheduleDTO : list ) {
            list1.add( generateCourseScheduleDTOToCourseSchedule( generateCourseScheduleDTO ) );
        }

        return list1;
    }
}
