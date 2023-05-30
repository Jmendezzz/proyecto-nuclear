package co.edu.cue.proyectonuclear.infrastructure.constrains;

import co.edu.cue.proyectonuclear.exceptions.UserException;
import co.edu.cue.proyectonuclear.infrastructure.dao.UserDAO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserConstrain {
    private final UserDAO userDAO;

    public void validateNidUser(String nid){
        if (userDAO.getUserByNid(nid).isPresent()){
            throw new UserException("El nid "+nid+" ya está en uso.", HttpStatus.BAD_REQUEST);
        }
    }

}
