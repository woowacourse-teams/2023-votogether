package com.votogether.domain.member.entity;

import lombok.Getter;

@Getter
public enum Gender {

    MALE("남성"),
    FEMALE("여성"),
    ;

    private final String name;

    Gender(final String name) {
        this.name = name;
    }

}
