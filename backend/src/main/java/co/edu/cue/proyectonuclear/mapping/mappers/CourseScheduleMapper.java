package co.edu.cue.proyectonuclear.mapping.mappers;


import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CourseScheduleMapper {

    Course mapFromDTO(CourseDTO courseDTO);
    CourseDTO mapFromEntity(Course course);



}
