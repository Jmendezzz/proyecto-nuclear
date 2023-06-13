package co.edu.cue.proyectonuclear.services;

import co.edu.cue.proyectonuclear.mapping.dtos.UserChangePasswordRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.UserDTO;

import java.util.Optional;

public interface UserService {

    Optional<UserDTO> getUserByUsername(String username);

    Optional<UserDTO> getUserById(Long id);

    void updatePassword(Long id, UserChangePasswordRequestDTO changePasswordRequestDTO);
}
