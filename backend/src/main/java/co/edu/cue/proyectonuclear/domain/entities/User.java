package co.edu.cue.proyectonuclear.domain.entities;


import co.edu.cue.proyectonuclear.domain.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class User {

    private Long id;
    private String name;
    private String lastName;

    private Role role;

    private String email;

    private String password;





}
