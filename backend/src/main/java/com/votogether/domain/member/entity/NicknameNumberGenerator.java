package com.votogether.domain.member.entity;

public class NicknameNumberGenerator implements NumberGenerator {

    private static int number = 0;

    @Override
    public int generate() {
        return ++number;
    }

}
