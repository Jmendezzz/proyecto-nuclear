package co.edu.cue.proyectonuclear.mapping.mappers;


import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.domain.entities.CourseSchedule;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.GenerateCourseScheduleDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CourseScheduleMapper {

    CourseSchedule mapFromDTO(GenerateCourseScheduleDTO courseDTO);
    GenerateCourseScheduleDTO mapFromEntity(Course course);



}
