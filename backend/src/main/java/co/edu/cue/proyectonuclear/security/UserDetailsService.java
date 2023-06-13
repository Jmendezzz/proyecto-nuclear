package co.edu.cue.proyectonuclear.security;

import co.edu.cue.proyectonuclear.domain.entities.User;

public interface UserDetailsService {
    User getByUsername(String username);
}
