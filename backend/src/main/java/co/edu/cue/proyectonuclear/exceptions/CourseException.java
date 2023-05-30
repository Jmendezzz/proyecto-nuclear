package co.edu.cue.proyectonuclear.exceptions;


import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
public class CourseException extends RuntimeException{
    private HttpStatus httpStatus;

    public CourseException(String message, HttpStatus httpStatus){
        super(message);
        this.httpStatus = httpStatus;
    }
}
