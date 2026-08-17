package com.adoptEase.exceptions;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	// Handle duplicate resources
	@ExceptionHandler(ResourceAlreadyExistsException.class)
	public ResponseEntity<Map<String, Object>> handleResourceAlreadyExists(ResourceAlreadyExistsException ex) {

		Map<String, Object> response = new HashMap<>();

		response.put("timestamp", LocalDateTime.now());
		response.put("status", HttpStatus.CONFLICT.value());
		response.put("message", ex.getMessage());

		return new ResponseEntity<>(response, HttpStatus.CONFLICT);
	}

	// Handle validation errors
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleValidationException(MethodArgumentNotValidException ex) {

		Map<String, String> errors = new HashMap<>();

		ex.getBindingResult().getFieldErrors()
				.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

		return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	}

	// Handle unexpected exceptions
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map<String, Object>> handleException(Exception ex) {

		Map<String, Object> response = new HashMap<>();

		response.put("timestamp", LocalDateTime.now());
		response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
		response.put("message", ex.getMessage());

		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// handle invalid credentioal error
	@ExceptionHandler(InvalidCredentialsException.class)
	public ResponseEntity<Map<String, Object>> handleInvalidCredentials(InvalidCredentialsException ex) {

		Map<String, Object> response = new HashMap<>();

		response.put("timestamp", LocalDateTime.now());
		response.put("status", HttpStatus.UNAUTHORIZED.value());
		response.put("message", ex.getMessage());

		return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<String> handleResourceNotFound(ResourceNotFoundException ex) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
	}

}