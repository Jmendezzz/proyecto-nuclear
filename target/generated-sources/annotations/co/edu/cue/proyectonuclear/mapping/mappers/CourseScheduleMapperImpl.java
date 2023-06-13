package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.Classroom;
import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.domain.entities.CourseSchedule;
import co.edu.cue.proyectonuclear.domain.entities.TimeSlot;
import co.edu.cue.proyectonuclear.domain.enums.DayOfWeek;
import co.edu.cue.proyectonuclear.domain.enums.Element;
import co.edu.cue.proyectonuclear.mapping.dtos.ClassroomDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.GenerateCourseScheduleDTO;
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
public class CourseScheduleMapperImpl implements CourseScheduleMapper {

    @Override
    public CourseSchedule mapFromDTO(GenerateCourseScheduleDTO courseDTO) {
        if ( courseDTO == null ) {
            return null;
        }

        CourseSchedule courseSchedule = new CourseSchedule();

        courseSchedule.setClassroom( classroomDTOToClassroom( courseDTO.classroom() ) );
        courseSchedule.setDay( courseDTO.day() );
        courseSchedule.setTimeSlot( courseDTO.timeSlot() );

        return courseSchedule;
    }

    @Override
    public GenerateCourseScheduleDTO mapFromEntity(Course course) {
        if ( course == null ) {
            return null;
        }

        DayOfWeek day = null;
        ClassroomDTO classroom = null;
        TimeSlot timeSlot = null;

        GenerateCourseScheduleDTO generateCourseScheduleDTO = new GenerateCourseScheduleDTO( day, classroom, timeSlot );

        return generateCourseScheduleDTO;
    }

    @Override
    public List<CourseSchedule> mapFromDTOList(List<GenerateCourseScheduleDTO> courseSchedule) {
        if ( courseSchedule == null ) {
            return null;
        }

        List<CourseSchedule> list = new ArrayList<CourseSchedule>( courseSchedule.size() );
        for ( GenerateCourseScheduleDTO generateCourseScheduleDTO : courseSchedule ) {
            list.add( mapFromDTO( generateCourseScheduleDTO ) );
        }

        return list;
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
}
