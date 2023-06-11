package co.edu.cue.proyectonuclear.infrastructure.dao.impl;

import co.edu.cue.proyectonuclear.domain.entities.UserModel;
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
        String query = "SELECT u FROM UserModel u WHERE u.nid = :nid";
        TypedQuery<UserModel> nativeQuery = entityManager.createQuery(query, UserModel.class);
        nativeQuery.setParameter("nid",nid);
        try{
            UserModel userModel = nativeQuery.getSingleResult();
            return Optional.of(mapper.mapFrom(userModel));
        }catch (NoResultException ex){
            return Optional.empty();
        }
    }

    @Override
    public Optional<UserModel> getUserByUsername(String username) {
        String query = "SELECT u FROM UserModel u WHERE u.username = :username";
        TypedQuery<UserModel> nativeQuery = entityManager.createQuery(query, UserModel.class);
        nativeQuery.setParameter("username",username);
        try{
            UserModel userModel = nativeQuery.getSingleResult();
            return Optional.of(userModel);
        }catch (NoResultException ex){
            return Optional.empty();
        }
    }
}
