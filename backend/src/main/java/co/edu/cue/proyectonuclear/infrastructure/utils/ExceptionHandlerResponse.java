package co.edu.cue.proyectonuclear.infrastructure.utils;

import co.edu.cue.proyectonuclear.exceptions.SubjectNotFoundException;
import co.edu.cue.proyectonuclear.infrastructure.utils.ErrorDetail;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDate;


@ControllerAdvice
public class ExceptionHandlerResponse extends ResponseEntityExceptionHandler {

    @ExceptionHandler(SubjectNotFoundException.class)
    public final ResponseEntity<ErrorDetail> subjectNotFoundException(Exception ex, WebRequest request){
        ErrorDetail errorDetail = new ErrorDetail(LocalDate.now(),ex.getMessage(),request.getDescription(false));
        return new ResponseEntity<>(errorDetail, HttpStatus.NOT_FOUND);
    }




}
