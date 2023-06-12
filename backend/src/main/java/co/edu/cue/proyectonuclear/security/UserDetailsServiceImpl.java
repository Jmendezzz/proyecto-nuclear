package co.edu.cue.proyectonuclear.security;

import co.edu.cue.proyectonuclear.domain.entities.UserModel;
import co.edu.cue.proyectonuclear.infrastructure.dao.UserDAO;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collections;


@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserDAO userDAO;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserModel userModel = userDAO.getUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("El usuario " + username + " no existe."));


        GrantedAuthority authoritie = new SimpleGrantedAuthority( "ROLE_"+ userModel.getRole().name());

        return new org.springframework.security.core.userdetails.User(
                userModel.getUsername(),
                userModel.getPassword(),
                true,
                true,
                true,
                true,
                Collections.singletonList(authoritie)

        );


    }
}
