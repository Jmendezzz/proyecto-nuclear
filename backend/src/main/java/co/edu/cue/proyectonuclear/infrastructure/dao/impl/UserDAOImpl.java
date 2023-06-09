package co.edu.cue.proyectonuclear.infrastructure.dao.impl;

import co.edu.cue.proyectonuclear.domain.entities.User;
import co.edu.cue.proyectonuclear.infrastructure.dao.UserDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.UserDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.UserMapper;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
@Transactional
@AllArgsConstructor
public class UserDAOImpl implements UserDAO {
    @PersistenceContext
    EntityManager entityManager;
    UserMapper mapper;

    @Override
    public Optional<UserDTO> getUserByNid(String nid) {
        String query = "SELECT u FROM User u WHERE u.nid = :nid";
        TypedQuery<User> nativeQuery = entityManager.createQuery(query,User.class);
        nativeQuery.setParameter("nid",nid);
        try{
            User user = nativeQuery.getSingleResult();
            return Optional.of(mapper.mapFrom(user));
        }catch (NoResultException ex){
            return Optional.empty();
        }
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        String query = "SELECT u FROM User u WHERE u.username = :username";
        TypedQuery<User> nativeQuery = entityManager.createQuery(query,User.class);
        nativeQuery.setParameter("username",username);
        try{
            User user = nativeQuery.getSingleResult();
            return Optional.of(user);
        }catch (NoResultException ex){
            return Optional.empty();
        }
    }
}
