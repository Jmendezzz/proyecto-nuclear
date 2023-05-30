package co.edu.cue.proyectonuclear.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
public class SubjectException extends RuntimeException{
    private HttpStatus httpStatus;
    public SubjectException(String message, HttpStatus httpStatus){
        super(message);
        this.httpStatus = httpStatus;
    }
}
