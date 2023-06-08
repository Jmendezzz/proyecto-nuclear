package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.User;
import co.edu.cue.proyectonuclear.mapping.dtos.UserDTO;

import java.util.Optional;

public interface UserDAO {
    Optional<UserDTO> getUserByNid(String nid);
    Optional<User> getUserByUsername(String nid);

}
