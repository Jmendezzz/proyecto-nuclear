package co.edu.cue.proyectonuclear.infrastructure.dao.impl;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.domain.entities.User;
import co.edu.cue.proyectonuclear.infrastructure.dao.UserDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.UserDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.UserMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
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
        String query = "SELECT * FROM user WHERE nid = :nid";
        Query nativeQuery = entityManager.createNativeQuery(query, User.class);
        nativeQuery.setParameter("nid", nid);
        try{
            User user = (User) nativeQuery.getSingleResult();
            return Optional.of(mapper.mapFrom(user));
        }catch (NoResultException ex){
            return Optional.empty();
        }
    }
}
