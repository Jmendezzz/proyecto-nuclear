package co.edu.cue.proyectonuclear.infrastructure.controllers;


import co.edu.cue.proyectonuclear.exceptions.UserException;
import co.edu.cue.proyectonuclear.mapping.dtos.UserChangePasswordRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.UserDTO;
import co.edu.cue.proyectonuclear.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class UserController {
    private UserService userService;
    @GetMapping("/users/{id}/details")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PROFESSOR')  or hasRole('STUDENT')")
    public ResponseEntity<UserDTO> getUserDetails(@PathVariable Long id){

        UserDTO user = userService.getUserById(id).orElseThrow(()->new UserException("No se encontró un usuario con el id" + id, HttpStatus.NOT_FOUND));

        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @PutMapping("/users/{id}/password")
    public ResponseEntity<String> updatePassword(@PathVariable Long id,  @RequestBody UserChangePasswordRequestDTO changePasswordRequestDTO){


        userService.updatePassword(id, changePasswordRequestDTO);

        return ResponseEntity.ok("Contraseña actualizada exitosamente");
    }

}
