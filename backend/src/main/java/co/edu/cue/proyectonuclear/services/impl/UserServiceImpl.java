package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.infrastructure.dao.UserDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.UserChangePasswordRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.UserDTO;
import co.edu.cue.proyectonuclear.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;


@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private UserDAO userDAO;

    @Override
    public Optional<UserDTO> getUserByUsername(String username) {
        return userDAO.getUserByUsernameResponse(username);
    }

    @Override
    public Optional<UserDTO> getUserById(Long id){
        return userDAO.getUserById(id);
    }

    @Override
    public void updatePassword(Long id, UserChangePasswordRequestDTO changePasswordRequestDTO) {
        userDAO.updatePassword(id, changePasswordRequestDTO);
    }
}
