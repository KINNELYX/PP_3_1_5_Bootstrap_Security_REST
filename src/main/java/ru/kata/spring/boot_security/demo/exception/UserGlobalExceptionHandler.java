package ru.kata.spring.boot_security.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserGlobalExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<ExceptionHandling> handleException(NoSuchUserException exception) {
        ExceptionHandling handling = new ExceptionHandling();
        handling.setInfo(exception.getMessage());
        return new ResponseEntity<>(handling, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionHandling> handleException(Exception exception) {
        ExceptionHandling handling = new ExceptionHandling();
        handling.setInfo(exception.getMessage());
        return new ResponseEntity<>(handling, HttpStatus.NOT_FOUND);
    }
}
