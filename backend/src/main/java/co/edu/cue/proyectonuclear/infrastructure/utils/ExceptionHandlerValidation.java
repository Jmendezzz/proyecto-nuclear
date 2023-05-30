package co.edu.cue.proyectonuclear.infrastructure.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;


import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ExceptionHandlerValidation {

    @ExceptionHandler(MethodArgumentNotValidException.class) //TODO
    public final Map<String,String> userCreationException(MethodArgumentNotValidException ex){
        HashMap<String,String> errorMap = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(e->{
            errorMap.put(e.getField(),e.getDefaultMessage());
        });
        return errorMap;


    }



}
