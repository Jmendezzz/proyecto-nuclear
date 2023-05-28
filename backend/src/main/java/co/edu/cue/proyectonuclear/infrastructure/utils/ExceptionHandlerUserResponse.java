package co.edu.cue.proyectonuclear.infrastructure.utils;

import co.edu.cue.proyectonuclear.exceptions.UserCreationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDate;

public class ExceptionHandlerUserResponse extends ResponseEntityExceptionHandler {
    @ExceptionHandler(UserCreationException.class)
    public final ResponseEntity<ErrorDetail> UserCreationException(Exception ex, WebRequest req){
        ErrorDetail errorDetail = new ErrorDetail(LocalDate.now(), ex.getMessage(), req.getDescription(false));
        return new ResponseEntity<>(errorDetail, HttpStatus.BAD_REQUEST);
    }
}
