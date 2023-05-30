package co.edu.cue.proyectonuclear.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND)
public class CourseException extends RuntimeException{
    public CourseException(String message){
        super(message);
    }
}
