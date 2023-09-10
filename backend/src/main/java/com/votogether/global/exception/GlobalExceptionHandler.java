package com.votogether.global.exception;

import com.votogether.domain.post.exception.PostExceptionType;
import jakarta.validation.ConstraintViolationException;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> handleException(final Exception e) {
        log.error("[" + e.getClass() + "] : " + e.getMessage());
        return ResponseEntity.internalServerError()
                .body(new ExceptionResponse(100, "알 수 없는 서버 에러가 발생했습니다."));
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> handleMethodArgumentNotValidException(
            final MethodArgumentNotValidException e
    ) {
        final List<ErrorResponse> errorResponses = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fieldError -> new ErrorResponse(fieldError.getField(), fieldError.getDefaultMessage()))
                .toList();
        log.warn("[" + e.getClass() + "] " + errorResponses);
        return ResponseEntity.badRequest()
                .body(new ExceptionResponse(200, errorResponses.toString()));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ExceptionResponse> constraintViolationException(final ConstraintViolationException e) {
        final List<ErrorResponse> errorResponses = e.getConstraintViolations()
                .stream()
                .map(error -> new ErrorResponse(error.getPropertyPath().toString(), error.getMessage()))
                .toList();
        log.warn("[" + e.getClass() + "] " + errorResponses);
        return ResponseEntity.badRequest()
                .body(new ExceptionResponse(201, errorResponses.toString()));
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> handleMethodArgumentTypeMismatchException(
            final MethodArgumentTypeMismatchException e
    ) {
        final ErrorResponse errorResponse = new ErrorResponse(
                e.getName(),
                e.getRequiredType().getSimpleName() + " 타입으로 변환할 수 없는 요청입니다."
        );
        log.warn("[" + e.getClass() + "] " + errorResponse);
        return ResponseEntity.badRequest()
                .body(new ExceptionResponse(202, errorResponse.toString()));
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> handleMissingServletRequestParameterException(
            final MissingServletRequestParameterException e
    ) {
        final ErrorResponse errorResponse = new ErrorResponse(
                e.getParameterName(),
                "파라미터가 필요합니다."
        );
        log.warn("[" + e.getClass() + "] " + errorResponse);
        return ResponseEntity.badRequest()
                .body(new ExceptionResponse(203, errorResponse.toString()));
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> handleBadRequestException(final BadRequestException e) {
        log.warn("[" + e.getClass() + "] : " + e.getMessage());
        return ResponseEntity.badRequest()
                .body(ExceptionResponse.from(e));
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> handleImageException(final ImageException e) {
        log.warn("[" + e.getClass() + "] : " + e.getMessage());
        return ResponseEntity.badRequest()
                .body(ExceptionResponse.from(e));
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> handleNotFoundException(final NotFoundException e) {
        log.warn("[" + e.getClass() + "] : " + e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ExceptionResponse.from(e));
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> handleMultipartException(final MultipartException e) {
        log.warn("[" + e.getClass() + "] : " + e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ExceptionResponse.from(new BadRequestException(PostExceptionType.WRONG_IMAGE)));
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> handleMissingServletRequestPartException(
            final MissingServletRequestPartException e
    ) {
        log.warn("[" + e.getClass() + "] : " + e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ExceptionResponse.from(new BadRequestException(PostExceptionType.WRONG_IMAGE)));
    }

}
