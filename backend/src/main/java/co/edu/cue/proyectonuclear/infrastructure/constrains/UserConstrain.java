package co.edu.cue.proyectonuclear.infrastructure.constrains;

import co.edu.cue.proyectonuclear.infrastructure.dao.UserDAO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserConstrain {
    private final UserDAO userDAO;

    public Boolean validateNidUser(String nid){return userDAO.getUserByNid(nid).isEmpty();}

}
