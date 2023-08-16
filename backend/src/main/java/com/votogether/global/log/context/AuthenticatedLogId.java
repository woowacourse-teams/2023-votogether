package com.votogether.global.log.context;

public class AuthenticatedLogId implements LogId {

    private static final String POSTFIX = "(memberId)";

    private final String id;

    public AuthenticatedLogId(final Long id) {
        this.id = String.valueOf(id);
    }

    @Override
    public String getId() {
        return id + POSTFIX;
    }

}
