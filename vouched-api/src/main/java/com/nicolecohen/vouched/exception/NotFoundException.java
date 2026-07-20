package com.nicolecohen.vouched.exception;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message){
        super(message);
    }
}
