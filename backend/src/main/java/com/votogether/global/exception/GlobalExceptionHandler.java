package com.votogether.global.exception;

import com.votogether.domain.post.exception.PostExceptionType;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
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
                .body(new ExceptionResponse(-9999, "알 수 없는 서버 에러가 발생했습니다."));
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> handleMethodArgumentTypeMismatchException(
            final MethodArgumentTypeMismatchException e
    ) {
        final String errorMessage = String.format(
                "%s는 %s 타입이 필요합니다.",
                e.getPropertyName(),
                e.getRequiredType().getSimpleName()
        );
        log.warn("[" + e.getClass() + "] : " + errorMessage);
        return ResponseEntity.badRequest()
                .body(new ExceptionResponse(-9998, errorMessage));
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> handleMethodArgumentNotValidException(
            final MethodArgumentNotValidException e
    ) {
        final List<String> errorMessages = e.getBindingResult()
                .getAllErrors()
                .stream()
                .map(ObjectError::getDefaultMessage)
                .toList();
        log.warn("[" + e.getClass() + "] : " + errorMessages);
        return ResponseEntity.badRequest()
                .body(new ExceptionResponse(-9997, errorMessages.toString()));
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> handleBadRequestException(final BadRequestException e) {
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
        System.out.println("================================");
        System.out.println("GlobalExceptionHandler.handleMultipartException");
        e.printStackTrace();

        log.warn("[" + e.getClass() + "] : " + e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ExceptionResponse.from(new BadRequestException(PostExceptionType.WRONG_IMAGE)));
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> handleMissingServletRequestPartException(
            final MissingServletRequestPartException e
    ) {
        System.out.println("================================");
        System.out.println("GlobalExceptionHandler.handleMissingServletRequestPartException");
        e.printStackTrace();

        log.warn("[" + e.getClass() + "] : " + e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ExceptionResponse.from(new BadRequestException(PostExceptionType.WRONG_IMAGE)));
    }

}
