package com.votogether.global.log.context;

import java.util.UUID;

public class AuthenticatedLogId implements LogId {

    private static final String POSTFIX = "(memberId)";

    private final String id;
    private final String tag;

    public AuthenticatedLogId(final Long id) {
        this.id = String.valueOf(id);
        this.tag = String.format("#%s", UUID.randomUUID().toString().substring(0, 8));
    }

    @Override
    public String getId() {
        return id + POSTFIX + tag;
    }

}
