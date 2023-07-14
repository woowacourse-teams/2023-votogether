package com.votogether.domain.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class KakaoMemberResponse {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class KakaoAccount {

        @JsonProperty("email")
        private String email;

        @JsonProperty("age_range")
        private String ageRange;

        @JsonProperty("birthday")
        private String birthday;

        @JsonProperty("gender")
        private String gender;

        @Override
        public String toString() {
            return "KakaoAccount{" +
                    "email='" + email + '\'' +
                    ", ageRange='" + ageRange + '\'' +
                    ", birthday='" + birthday + '\'' +
                    ", gender='" + gender + '\'' +
                    '}';
        }
    }

    @Override
    public String toString() {
        return "UserResponse{" +
                "id=" + id +
                ", kakaoAccount=" + kakaoAccount +
                '}';
    }
}
