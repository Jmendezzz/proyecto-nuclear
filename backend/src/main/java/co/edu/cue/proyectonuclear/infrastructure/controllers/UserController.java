package co.edu.cue.proyectonuclear.infrastructure.controllers;


import co.edu.cue.proyectonuclear.domain.entities.User;
import co.edu.cue.proyectonuclear.domain.enums.Role;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    /*
    * Esto es solo un ejemplo, con esto podran visualizar cual es el formato de JSON que está retornando el modelo User.
    * */

    @GetMapping("/user")
    public User getUser(){
        return new User(1L,"Juan","Mendez", Role.ADMIN,"example@cue.edu.co","holaman123");
    }
}
