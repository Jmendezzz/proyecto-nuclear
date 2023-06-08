package co.edu.cue.proyectonuclear.security;

import co.edu.cue.proyectonuclear.domain.entities.User;
import co.edu.cue.proyectonuclear.exceptions.UserException;
import co.edu.cue.proyectonuclear.infrastructure.dao.UserDAO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService{
    private final UserDAO userDAO;
    @Override
    public User getByUsername(String username) {
        Optional<User> user = userDAO.getUserByUsername(username);
        if (user.isPresent()){
            return user.get();
        }else{
            throw new UserException("No se encontro el usuario con el username: "+username, HttpStatus.BAD_REQUEST);
        }
    }
}
