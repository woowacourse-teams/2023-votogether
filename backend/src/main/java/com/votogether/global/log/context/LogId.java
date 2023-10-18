package com.votogether.global.log.context;

public interface LogId {

    static LogId from(final MemberIdHolder memberIdHolder) {
        if (memberIdHolder.getId() == -1L) {
            return new AnonymousLogId();
        }
        return new AuthenticatedLogId(memberIdHolder.getId());
    }

    String getId();

}
