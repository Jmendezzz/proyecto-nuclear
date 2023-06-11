package co.edu.cue.proyectonuclear.security;

import co.edu.cue.proyectonuclear.domain.entities.UserModel;

public interface UserDetailsService {
    UserModel getByUsername(String username);
}
