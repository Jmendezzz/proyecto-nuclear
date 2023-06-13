package co.edu.cue.proyectonuclear.mapping.dtos;

public record UserChangePasswordRequestDTO(
        String currentPassword,
        String newPassword
) {

}
