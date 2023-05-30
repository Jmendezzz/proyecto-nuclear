package co.edu.cue.proyectonuclear.exceptions;

import lombok.Data;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ClassroomException extends RuntimeException{
    private HttpStatus httpStatus;
    public ClassroomException(String message, HttpStatus httpStatus){
        super(message);
        this.httpStatus=httpStatus;
    }
}
