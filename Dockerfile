
# 베이스 이미지 정의
FROM gradle:latest

# 작업 디렉토리 설정
WORKDIR /backend

# Gradle 설치
RUN apt-get update && \
    apt-get install -y curl && \
    apt install zip && \
    curl -s "https://get.sdkman.io" | bash && \
    /bin/bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install gradle 8.1"

# Gradle 빌드를 위해 필요한 파일 복사
COPY backend /backend

# Gradle 빌드


# 애플리케이션 포트 노출
EXPOSE 8080

# 애플리케이션 실행
CMD /bin/bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && gradle bootRun -Dspring.profiles.active=local"

# ARG JAR_FILE=*.jar

# COPY ${JAR_FILE} app.jar

# ENTRYPOINT ["java","-jar","/app.jar","--spring.profiles.active=local"]



