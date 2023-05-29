package co.edu.cue.proyectonuclear.exceptions;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ClassroomException extends RuntimeException{
    private HttpStatus httpStatus;
    public ClassroomException(String message, HttpStatus httpStatus){
        super(message);
    }
}
