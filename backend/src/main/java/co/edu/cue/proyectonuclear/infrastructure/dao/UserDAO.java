package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.mapping.dtos.UserDTO;

import java.util.Optional;

public interface UserDAO {
    Optional<UserDTO> getUserByNid(String nid);
}
