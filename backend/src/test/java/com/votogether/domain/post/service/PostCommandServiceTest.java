package com.votogether.domain.post.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.votogether.domain.category.entity.Category;
import com.votogether.domain.member.entity.Member;
import com.votogether.domain.member.entity.MemberMetric;
import com.votogether.domain.member.repository.MemberMetricRepository;
import com.votogether.domain.post.dto.request.post.PostCreateRequest;
import com.votogether.domain.post.dto.request.post.PostOptionCreateRequest;
import com.votogether.domain.post.dto.request.post.PostOptionUpdateRequest;
import com.votogether.domain.post.dto.request.post.PostUpdateRequest;
import com.votogether.domain.post.entity.Post;
import com.votogether.domain.post.entity.PostOption;
import com.votogether.domain.post.repository.PostCategoryRepository;
import com.votogether.domain.post.repository.PostContentImageRepository;
import com.votogether.domain.post.repository.PostOptionRepository;
import com.votogether.domain.post.repository.PostRepository;
import com.votogether.global.exception.BadRequestException;
import com.votogether.global.exception.ImageException;
import com.votogether.global.exception.NotFoundException;
import com.votogether.infra.image.ImageExceptionType;
import com.votogether.test.ServiceTest;
import jakarta.persistence.EntityManager;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import javax.imageio.ImageIO;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;

class PostCommandServiceTest extends ServiceTest {

    @Autowired
    EntityManager em;

    @Autowired
    PostCommandService postCommandService;

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostCategoryRepository postCategoryRepository;

    @Autowired
    PostContentImageRepository postContentImageRepository;

    @Autowired
    PostOptionRepository postOptionRepository;

    @Autowired
    MemberMetricRepository memberMetricRepository;

    @AfterEach
    void tearDown(
            @Value("${image.upload_directory}") String uploadDirectory
    ) {
        File folder = new File(uploadDirectory);
        if (folder.exists()) {
            deleteFileRecursive(folder);
        }
    }

    private static void deleteFileRecursive(File file) {
        if (file.isDirectory()) {
            File[] files = file.listFiles();
            if (files == null) {
                return;
            }

            for (File child : files) {
                deleteFileRecursive(child);
            }
        }
        file.delete();
    }

    @Test
    @DisplayName("정상적인 요청이라면 게시글을 작성한다.")
    void createPost() {
        // given
        Category categoryA = categoryTestPersister.builder().save();
        Category categoryB = categoryTestPersister.builder().save();
        PostCreateRequest postCreateRequest = mockingPostCreateRequest(List.of(categoryA.getId(), categoryB.getId()));
        Member member = memberTestPersister.builder().save();
        MemberMetric memberMetric = memberMetricTestPersister.builder().member(member).save();

        // when
        Long postId = postCommandService.createPost(postCreateRequest, member);

        // then
        Post post = postRepository.findById(postId).get();
        assertSoftly(softly -> {
            softly.assertThat(post.getPostCategories()).hasSize(2);
            softly.assertThat(post.getPostContentImages()).hasSize(1);
            softly.assertThat(post.getPostOptions()).hasSize(2);
            softly.assertThat(post.getVoteCount()).isZero();
            softly.assertThat(memberMetric.getPostCount()).isEqualTo(1);
        });
    }

    @Nested
    @DisplayName("게시글 수정")
    class UpdatePost {

        @Test
        @DisplayName("수정된 게시글 옵션 개수가 같으면 옵션 내용이 수정된다.")
        void updateSameSizeOptions() {
            // given
            Category categoryA = categoryTestPersister.builder().save();
            Category categoryB = categoryTestPersister.builder().save();
            PostCreateRequest postCreateRequest = mockingPostCreateRequest(
                    List.of(
                            categoryA.getId(),
                            categoryB.getId()
                    )
            );
            Member member = memberTestPersister.builder().save();
            memberMetricTestPersister.builder().member(member).save();
            Long postId = postCommandService.createPost(postCreateRequest, member);
            PostUpdateRequest postUpdateRequest = new PostUpdateRequest(
                    List.of(categoryA.getId()),
                    "New Title",
                    "New Content",
                    "votogether.png",
                    mockingMultipartFile("votogether.jpg"),
                    List.of(
                            new PostOptionUpdateRequest(
                                    null,
                                    "option1",
                                    "votogether.png",
                                    null
                            ),
                            new PostOptionUpdateRequest(
                                    null,
                                    "option2",
                                    null,
                                    mockingMultipartFile("votogether.png")
                            )
                    ),
                    LocalDateTime.now().plusDays(3)
            );

            // when
            postCommandService.updatePost(postId, postUpdateRequest, member);

            // then
            Post post = postRepository.findById(postId).get();
            assertSoftly(softly -> {
                softly.assertThat(post.getPostCategories()).hasSize(1);
                softly.assertThat(post.getPostContentImages()).hasSize(1);
                softly.assertThat(post.getPostOptions()).hasSize(2);
            });
        }

        @Test
        @DisplayName("수정된 게시글 옵션 개수가 적으면 게시글 옵션이 삭제된다.")
        void addPostOptions() {
            // given
            Category categoryA = categoryTestPersister.builder().save();
            Category categoryB = categoryTestPersister.builder().save();
            Category categoryC = categoryTestPersister.builder().save();
            PostCreateRequest postCreateRequest = mockingPostCreateRequest(
                    List.of(
                            categoryA.getId(),
                            categoryB.getId()
                    )
            );
            Member member = memberTestPersister.builder().save();
            memberMetricTestPersister.builder().member(member).save();
            Long postId = postCommandService.createPost(postCreateRequest, member);
            PostUpdateRequest postUpdateRequest = new PostUpdateRequest(
                    List.of(categoryA.getId(), categoryB.getId(), categoryC.getId()),
                    "New Title",
                    "New Content",
                    null,
                    mockingMultipartFile("votogether.jpg"),
                    List.of(
                            new PostOptionUpdateRequest(
                                    null,
                                    "option1",
                                    null,
                                    null
                            )
                    ),
                    LocalDateTime.now().plusDays(3)
            );

            // when
            postCommandService.updatePost(postId, postUpdateRequest, member);

            // then
            Post post = postRepository.findById(postId).get();
            assertSoftly(softly -> {
                softly.assertThat(post.getPostCategories()).hasSize(3);
                softly.assertThat(post.getPostContentImages()).hasSize(1);
                softly.assertThat(post.getPostOptions()).hasSize(1);
            });
        }

        @Test
        @DisplayName("수정된 게시글 옵션 개수가 많으면 게시글 옵션이 추가된다.")
        void removePostOptions() {
            // given
            Category categoryA = categoryTestPersister.builder().save();
            Category categoryB = categoryTestPersister.builder().save();
            PostCreateRequest postCreateRequest = mockingPostCreateRequest(
                    List.of(
                            categoryA.getId(),
                            categoryB.getId()
                    )
            );
            Member member = memberTestPersister.builder().save();
            memberMetricTestPersister.builder().member(member).save();
            Long postId = postCommandService.createPost(postCreateRequest, member);
            PostUpdateRequest postUpdateRequest = new PostUpdateRequest(
                    List.of(categoryA.getId()),
                    "New Title",
                    "New Content",
                    null,
                    null,
                    List.of(
                            new PostOptionUpdateRequest(
                                    null,
                                    "option1",
                                    "vogother.png",
                                    null
                            ),
                            new PostOptionUpdateRequest(
                                    null,
                                    "option2",
                                    "votogether.png",
                                    mockingMultipartFile("votogether.jpg")
                            ),
                            new PostOptionUpdateRequest(
                                    null,
                                    "option3",
                                    null,
                                    null
                            )
                    ),
                    LocalDateTime.now().plusDays(3)
            );

            // when
            postCommandService.updatePost(postId, postUpdateRequest, member);

            // then
            Post post = postRepository.findById(postId).get();
            assertSoftly(softly -> {
                softly.assertThat(post.getPostCategories()).hasSize(1);
                softly.assertThat(post.getPostContentImages()).hasSize(0);
                softly.assertThat(post.getPostOptions()).hasSize(3);
            });
        }

        @Test
        @DisplayName("존재하지 않는 게시글이라면 예외를 던진다.")
        void emptyPost() {
            // given
            Member member = memberTestPersister.builder().save();
            PostUpdateRequest postUpdateRequest = mockingPostUpdateRequest();

            // when, then
            assertThatThrownBy(() -> postCommandService.updatePost(-1L, postUpdateRequest, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("블라인드된 게시글이라면 예외를 던진다.")
        void blindPost() {
            // given
            Member member = memberTestPersister.builder().save();
            PostUpdateRequest postUpdateRequest = mockingPostUpdateRequest();
            Post post = postTestPersister.postBuilder().writer(member).save();
            post.blind();

            // when, then
            assertThatThrownBy(() -> postCommandService.updatePost(post.getId(), postUpdateRequest, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("신고에 의해 숨겨진 게시글은 접근할 수 없습니다.");
        }

        @Test
        @DisplayName("게시글 작성자가 아니라면 예외를 던진다.")
        void postNotWriter() {
            // given
            Member member = memberTestPersister.builder().save();
            PostUpdateRequest postUpdateRequest = mockingPostUpdateRequest();
            Post post = postTestPersister.postBuilder().save();

            // when, then
            assertThatThrownBy(() -> postCommandService.updatePost(post.getId(), postUpdateRequest, member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글 작성자가 아닙니다.");
        }

    }

    @Nested
    @DisplayName("게시글 조기 마감")
    class ClosePostEarly {

        @Test
        @DisplayName("정상적인 요청이라면 게시글을 조기 마감한다.")
        void success() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();

            // when
            postCommandService.closePostEarly(post.getId(), member);

            // then
            assertThat(post.isClosed()).isTrue();
        }

        @Test
        @DisplayName("존재하지 않는 게시글이라면 예외를 던진다.")
        void emptyPost() {
            // given
            Member member = memberTestPersister.builder().save();

            // when, then
            assertThatThrownBy(() -> postCommandService.closePostEarly(-1L, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("블라인드된 게시글이라면 예외를 던진다.")
        void blindPost() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            post.blind();

            // when, then
            assertThatThrownBy(() -> postCommandService.closePostEarly(post.getId(), member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("신고에 의해 숨겨진 게시글은 접근할 수 없습니다.");
        }

        @Test
        @DisplayName("게시글 작성자가 아니라면 예외를 던진다.")
        void postNotWriter() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();

            // when, then
            assertThatThrownBy(() -> postCommandService.closePostEarly(post.getId(), member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글 작성자가 아닙니다.");
        }

    }

    @Nested
    @DisplayName("게시글 삭제")
    class DeletePost {

        @Test
        @DisplayName("정상적인 요청이라면 게시글을 삭제한다.")
        void success() {
            // given
            Category categoryA = categoryTestPersister.builder().save();
            Category categoryB = categoryTestPersister.builder().save();
            PostCreateRequest postCreateRequest = mockingPostCreateRequest(
                    List.of(categoryA.getId(), categoryB.getId()));
            Member member = memberTestPersister.builder().save();
            MemberMetric memberMetric = memberMetricTestPersister.builder().member(member).save();
            Long postId = postCommandService.createPost(postCreateRequest, member);

            em.flush();
            em.clear();

            // when
            postCommandService.deletePost(postId, member);

            // then
            assertSoftly(softly -> {
                softly.assertThat(postRepository.findAll()).isEmpty();
                softly.assertThat(postCategoryRepository.findAll()).isEmpty();
                softly.assertThat(postContentImageRepository.findAll()).isEmpty();
                softly.assertThat(postOptionRepository.findAll()).isEmpty();
                softly.assertThat(memberMetricRepository.findById(memberMetric.getId()).get().getPostCount()).isZero();
            });
        }

        @Test
        @DisplayName("존재하지 않는 게시글이라면 예외를 던진다.")
        void emptyPost() {
            // given
            Member member = memberTestPersister.builder().save();

            // when, then
            assertThatThrownBy(() -> postCommandService.deletePost(-1L, member))
                    .isInstanceOf(NotFoundException.class)
                    .hasMessage("게시글이 존재하지 않습니다.");
        }

        @Test
        @DisplayName("블라인드된 게시글이라면 예외를 던진다.")
        void blindPost() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            post.blind();

            // when, then
            assertThatThrownBy(() -> postCommandService.deletePost(post.getId(), member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("신고에 의해 숨겨진 게시글은 접근할 수 없습니다.");
        }

        @Test
        @DisplayName("게시글 작성자가 아니라면 예외를 던진다.")
        void postNotWriter() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().save();

            // when, then
            assertThatThrownBy(() -> postCommandService.deletePost(post.getId(), member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("게시글 작성자가 아닙니다.");
        }

        @Test
        @DisplayName("게시글을 삭제할 수 없는 상태라면 예외를 던진다.")
        void invalidDelete() {
            // given
            Member member = memberTestPersister.builder().save();
            Post post = postTestPersister.postBuilder().writer(member).save();
            PostOption postOption = postTestPersister.postOptionBuilder().post(post).sequence(1).save();
            post.addPostOption(postOption);
            ReflectionTestUtils.setField(postOption, "voteCount", 20);

            // when, then
            assertThatThrownBy(() -> postCommandService.deletePost(post.getId(), member))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessage("일정 투표 수 이상의 게시글은 삭제할 수 없습니다.");
        }

    }

    private PostCreateRequest mockingPostCreateRequest(List<Long> categoryIds) {
        return new PostCreateRequest(
                categoryIds,
                "title",
                "content",
                mockingMultipartFile("votogether.png"),
                List.of(
                        new PostOptionCreateRequest(
                                "option1",
                                mockingMultipartFile("votogether.png")
                        ),
                        new PostOptionCreateRequest(
                                "option2",
                                null
                        )
                ),
                LocalDateTime.now().plusDays(3)
        );
    }

    private PostUpdateRequest mockingPostUpdateRequest() {
        return new PostUpdateRequest(
                List.of(1L),
                "New Title",
                "New Content",
                "votogether.png",
                mockingMultipartFile("votogether.jpg"),
                List.of(
                        new PostOptionUpdateRequest(
                                1L,
                                "option1",
                                "votogether.png",
                                null
                        ),
                        new PostOptionUpdateRequest(
                                2L,
                                "option2",
                                null,
                                mockingMultipartFile("votogether.png")
                        )
                ),
                LocalDateTime.now().plusDays(3)
        );
    }

    private MultipartFile mockingMultipartFile(String fileName) {
        return new MockMultipartFile(
                "images",
                fileName,
                MediaType.IMAGE_JPEG_VALUE,
                generateMockImage()
        );
    }

    private byte[] generateMockImage() {
        BufferedImage image = new BufferedImage(100, 100, BufferedImage.TYPE_INT_RGB);

        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            ImageIO.write(image, "jpg", byteArrayOutputStream);
            return byteArrayOutputStream.toByteArray();
        } catch (IOException e) {
            throw new ImageException(ImageExceptionType.IMAGE_TRANSFER);
        }
    }

}
