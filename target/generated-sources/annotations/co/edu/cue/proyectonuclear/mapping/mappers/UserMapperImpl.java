package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.User;
import co.edu.cue.proyectonuclear.domain.enums.Role;
import co.edu.cue.proyectonuclear.mapping.dtos.UserDTO;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-10T11:39:41-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User mapFrom(UserDTO source) {
        if ( source == null ) {
            return null;
        }

        User user = new User();

        user.setId( source.id() );
        user.setNid( source.nid() );
        user.setName( source.name() );
        user.setLastName( source.lastName() );
        user.setRole( source.role() );
        user.setEmail( source.email() );

        return user;
    }

    @Override
    public UserDTO mapFrom(User source) {
        if ( source == null ) {
            return null;
        }

        Long id = null;
        String nid = null;
        String name = null;
        String lastName = null;
        Role role = null;
        String email = null;

        id = source.getId();
        nid = source.getNid();
        name = source.getName();
        lastName = source.getLastName();
        role = source.getRole();
        email = source.getEmail();

        UserDTO userDTO = new UserDTO( id, nid, name, lastName, role, email );

        return userDTO;
    }
}
