package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.UserModel;
import co.edu.cue.proyectonuclear.mapping.dtos.UserChangePasswordRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.UserDTO;

import java.util.Optional;

public interface UserDAO {
    Optional<UserDTO> getUserById(Long id);

    Optional<UserDTO> getUserByNid(String nid);
    Optional<UserModel> getUserByUsername(String nid);

    Optional<UserDTO> getUserByUsernameResponse(String username);

    void updatePassword(Long id, UserChangePasswordRequestDTO changePasswordRequestDTO);
}
