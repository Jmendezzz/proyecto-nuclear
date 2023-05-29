package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.User;
import co.edu.cue.proyectonuclear.mapping.dtos.UserDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User mapFrom(UserDTO source);
    UserDTO mapFrom(User source);
}
