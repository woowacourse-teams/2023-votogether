package com.votogether.global.log.context;

import java.util.UUID;

public class AnonymousLogId implements LogId {

    private static final String POSTFIX = "(anonymous)";

    private final String id;

    public AnonymousLogId() {
        this.id = UUID.randomUUID().toString().substring(0, 8);
    }

    @Override
    public String getId() {
        return id + POSTFIX;
    }

}
