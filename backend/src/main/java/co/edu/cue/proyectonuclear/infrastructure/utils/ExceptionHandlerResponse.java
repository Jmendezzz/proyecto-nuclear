package co.edu.cue.proyectonuclear.infrastructure.utils;

import co.edu.cue.proyectonuclear.exceptions.ClassroomException;
import co.edu.cue.proyectonuclear.exceptions.ProfessorException;
import co.edu.cue.proyectonuclear.exceptions.SubjectException;
import co.edu.cue.proyectonuclear.exceptions.UserException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDate;


@ControllerAdvice
public class ExceptionHandlerResponse extends ResponseEntityExceptionHandler { //Manejo de excepciones del módulo Subject.

    @ExceptionHandler(SubjectException.class)
    public final ResponseEntity<ErrorDetail> subjectException(SubjectException ex, WebRequest request){
        ErrorDetail errorDetail = new ErrorDetail(LocalDate.now(),ex.getMessage(),request.getDescription(false));
        return new ResponseEntity<>(errorDetail, ex.getHttpStatus());
    }
    @ExceptionHandler(ClassroomException.class)
    public final ResponseEntity<ErrorDetail> classroomException(ClassroomException ex, WebRequest request){
        ErrorDetail errorDetail = new ErrorDetail(LocalDate.now(),ex.getMessage(),request.getDescription(false));
        return new ResponseEntity<>(errorDetail, ex.getHttpStatus());
    }
    @ExceptionHandler(UserException.class)
    public final ResponseEntity<ErrorDetail> userException(UserException ex, WebRequest req){
        ErrorDetail errorDetail = new ErrorDetail(LocalDate.now(), ex.getMessage(), req.getDescription(false));
        return new ResponseEntity<>(errorDetail, ex.getHttpStatus());
    }
    @ExceptionHandler(ProfessorException.class)
    public final ResponseEntity<ErrorDetail> professorException(ProfessorException ex, WebRequest req){
        ErrorDetail errorDetail = new ErrorDetail(LocalDate.now(), ex.getMessage(), req.getDescription(false));
        return new ResponseEntity<>(errorDetail, ex.getHttpStatus());
    }







}
