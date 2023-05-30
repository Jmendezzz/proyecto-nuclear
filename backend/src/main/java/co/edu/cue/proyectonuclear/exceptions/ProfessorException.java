package co.edu.cue.proyectonuclear.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ProfessorException extends RuntimeException{
    private HttpStatus httpStatus;
    public ProfessorException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }
}
