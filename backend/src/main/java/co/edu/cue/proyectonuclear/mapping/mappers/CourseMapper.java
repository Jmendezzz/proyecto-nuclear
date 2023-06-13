package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseUserRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.GenerateCourseDTO;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel = "spring")
public interface CourseMapper {

    CourseDTO mapFromEntity(Course course);

    Course mapFromDTO(CourseDTO courseDTO);

    List<CourseDTO> mapFromEntity(List<Course> courses);

    Course mapFromGenerateDTO(GenerateCourseDTO course);

    List<CourseUserRequestDTO> mapFromEntityUserRequest(List<Course> courses);

}
