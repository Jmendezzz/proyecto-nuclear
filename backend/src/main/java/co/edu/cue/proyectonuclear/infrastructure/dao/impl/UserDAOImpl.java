package co.edu.cue.proyectonuclear.infrastructure.dao.impl;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.domain.entities.UserModel;
import co.edu.cue.proyectonuclear.exceptions.UserException;
import co.edu.cue.proyectonuclear.infrastructure.dao.UserDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.UserChangePasswordRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.UserDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.UserMapper;
import co.edu.cue.proyectonuclear.security.filters.PasswordEncoderProvider;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
@Transactional
@AllArgsConstructor
public class UserDAOImpl implements UserDAO {
    @PersistenceContext
    EntityManager entityManager;
    private UserMapper mapper;

    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public Optional<UserDTO> getUserById(Long id){
        try{
            UserModel user = entityManager.find(UserModel.class, id);
            return Optional.of(mapper.mapFrom(user));
        }catch (NullPointerException ex){
            return Optional.empty();
        }
    }

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

    @Override
    public Optional<UserDTO> getUserByUsernameResponse(String username) {
        String query = "SELECT u FROM UserModel u WHERE u.username = :username";
        TypedQuery<UserModel> nativeQuery = entityManager.createQuery(query, UserModel.class);
        nativeQuery.setParameter("username",username);
        try{
            UserModel userModel = nativeQuery.getSingleResult();
            return Optional.of(mapper.mapFrom(userModel));
        }catch (NoResultException ex){
            return Optional.empty();
        }
    }

    @Override
    public void updatePassword(Long id, UserChangePasswordRequestDTO changePasswordRequestDTO) {
        try{
            UserModel user = entityManager.find(Professor.class, id);
            if(passwordEncoder.matches(changePasswordRequestDTO.currentPassword(), user.getPassword())){
                String newPasswordEncode = passwordEncoder.encode(changePasswordRequestDTO.newPassword());
                user.setPassword(newPasswordEncode);
                entityManager.merge(user);
            }else{
                throw new UserException("No se puede actualizar la contraseña, la contraseña actual ingresada  es incorrecta",HttpStatus.BAD_REQUEST);
            }
        }catch (NullPointerException ex){
            throw new UserException("No se encontró un usuario con el ID: "+ id, HttpStatus.BAD_REQUEST);
        }

    }

}
