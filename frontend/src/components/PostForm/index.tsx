import type { UseMutateFunction } from '@tanstack/react-query';

import React, { HTMLAttributes, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { PostInfo } from '@type/post';

import { useContentImage } from '@hooks/useContentImage';
import { useMultiSelect } from '@hooks/useMultiSelect';
import { useText } from '@hooks/useText';
import { useToast } from '@hooks/useToast';
import { useToggle } from '@hooks/useToggle';
import { useWritingOption } from '@hooks/useWritingOption';

import ErrorBoundary from '@pages/ErrorBoundary';

import HeaderTextButton from '@components/common/HeaderTextButton';
import Modal from '@components/common/Modal';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import SquareButton from '@components/common/SquareButton';
import TimePickerOptionList from '@components/common/TimePickerOptionList';
import Toast from '@components/common/Toast';
import WritingVoteOptionList from '@components/optionList/WritingVoteOptionList';

import { PATH } from '@constants/path';
import {
  CONTENT_PLACEHOLDER,
  POST_DEADLINE_POLICY,
  POST_TITLE_POLICY,
} from '@constants/policyMessage';
import { CATEGORY_COUNT_LIMIT, MAX_DEADLINE, POST_CONTENT, POST_TITLE } from '@constants/post';

import { calculateDeadlineTime } from '@utils/post/calculateDeadlineTime';
import { checkWriter } from '@utils/post/checkWriter';
import { deleteOverlappingNewLine } from '@utils/post/deleteOverlappingNewLine';
import { addTimeToDate } from '@utils/post/formatTime';
import { getDeadlineTime } from '@utils/post/getDeadlineTime';
import { getSelectedTimeOption } from '@utils/post/getSelectedTimeOption';
import { checkIrreplaceableTime } from '@utils/time';

import CategoryWrapper from './CategoryWrapper';
import { DEADLINE_OPTION, DeadlineOptionInfo, DeadlineOptionName } from './constants';
import ContentImagePart from './ContentImageSection';
import * as S from './style';
import { checkValidationPost } from './validation';

interface PostFormProps extends HTMLAttributes<HTMLFormElement> {
  data?: PostInfo;
  mutate: UseMutateFunction<any, unknown, FormData, unknown>;
}

export default function PostForm({ data, mutate }: PostFormProps) {
  const {
    postId,
    title,
    content,
    category: categoryIds,
    createTime,
    deadline,
    voteInfo: serverVoteInfo,
    imageUrl: serverImageUrl,
    writer,
  } = data ?? {};

  const navigate = useNavigate();
  const contentImageHook = useContentImage(serverImageUrl);
  const { handlePasteImage } = contentImageHook;
  const writingOptionHook = useWritingOption(
    serverVoteInfo?.options.map(option => ({
      ...option,
      imageUrl: option.imageUrl ?? '',
    }))
  );

  const { isToastOpen, openToast, toastMessage } = useToast();
  const [selectTimeOption, setSelectTimeOption] = useState<
    DeadlineOptionName | '사용자지정' | null
  >(getSelectedTimeOption(calculateDeadlineTime(createTime, deadline)));
  const { isOpen, openComponent, closeComponent } = useToggle();
  const [time, setTime] = useState(calculateDeadlineTime(createTime, deadline));
  const baseTime = createTime ? new Date(createTime) : new Date();
  const closeModal = () => {
    if (data && checkIrreplaceableTime(time, data.createTime)) {
      openToast('마감시간 지정 조건을 다시 확인해주세요.');
      const updatedTime = {
        day: 0,
        hour: 0,
        minute: 0,
      };
      setTime(updatedTime);
      setSelectTimeOption(null);
    }

    setSelectTimeOption(Object.values(time).every(time => time === 0) ? null : '사용자지정');
    closeComponent();
  };

  const { text: writingTitle, handleTextChange: handleTitleChange } = useText(title ?? '');
  const {
    text: writingContent,
    handleTextChange: handleContentChange,
    addText: addContent,
  } = useText(content ?? '');
  const multiSelectHook = useMultiSelect(categoryIds ?? [], CATEGORY_COUNT_LIMIT);

  const handleDeadlineButtonClick = (option: DeadlineOptionInfo) => {
    const targetTime = option.time;

    if (data && checkIrreplaceableTime(targetTime, data.createTime))
      return openToast('마감시간 지정 조건을 다시 확인해주세요.');
    setSelectTimeOption(option.name);
    setTime(targetTime);
  };

  const handleResetButton = () => {
    if (window.confirm('정말 초기화하시겠습니까?')) {
      const updatedTime = {
        day: 0,
        hour: 0,
        minute: 0,
      };
      setTime(updatedTime);
    }
  };

  const handleInsertContentLink = () => {
    addContent('[[이 괄호 안에 링크를 작성해주세요]] ');
  };

  const handlePostFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    //예외처리
    const { selectedOptionList } = multiSelectHook;
    const errorMessage = checkValidationPost(
      selectedOptionList,
      writingTitle,
      writingContent,
      writingOptionHook.optionList,
      time
    );
    if (errorMessage) return openToast(errorMessage);

    const writingOptionList = writingOptionHook.optionList.map(
      ({ id, isServerId, text, imageUrl }, index) => {
        return { id, isServerId, content: text, imageUrl };
      }
    );

    if (e.target instanceof HTMLFormElement) {
      const imageFileInputs = e.target.querySelectorAll<HTMLInputElement>('input[type="file"]');
      const fileInputList = [...imageFileInputs];

      selectedOptionList.forEach(categoryId =>
        formData.append('categoryIds', categoryId.id.toString())
      );
      formData.append('title', writingTitle);
      formData.append('content', deleteOverlappingNewLine(writingContent));
      formData.append('imageUrl', contentImageHook.contentImage);
      writingOptionList.forEach((option, index) => {
        option.isServerId && formData.append(`postOptions[${index}].id`, option.id.toString());
        formData.append(`postOptions[${index}].content`, deleteOverlappingNewLine(option.content));
        formData.append(`postOptions[${index}].imageUrl`, option.imageUrl);
      });
      formData.append('deadline', addTimeToDate(time, baseTime));

      fileInputList.forEach((item: HTMLInputElement, index: number) => {
        if (!item.files) return;

        if (index === 0) {
          item.files[0] && formData.append('imageFile', item.files[0]);
        } else {
          item.files[0] && formData.append(`postOptions[${index - 1}].imageFile`, item.files[0]);
        }
      });

      mutate(formData);
    }
  };

  if (postId && writer && !checkWriter(writer.id)) return <Navigate to={PATH.HOME} />;

  return (
    <>
      <S.HeaderWrapper>
        <NarrowTemplateHeader>
          <HeaderTextButton onClick={() => navigate('/')}>취소</HeaderTextButton>
          <HeaderTextButton type="submit" form="form-post">
            저장
          </HeaderTextButton>
        </NarrowTemplateHeader>
      </S.HeaderWrapper>
      <form id="form-post" onSubmit={handlePostFormSubmit}>
        <S.Wrapper>
          <S.LeftSide $hasImage={!!contentImageHook.contentImage}>
            <ErrorBoundary>
              <CategoryWrapper multiSelectHook={multiSelectHook} />
            </ErrorBoundary>
            <S.Title
              value={writingTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleTitleChange(e, POST_TITLE)
              }
              placeholder={POST_TITLE_POLICY.DEFAULT}
              maxLength={POST_TITLE.MAX_LENGTH}
              minLength={POST_TITLE.MIN_LENGTH}
              required
            />
            <S.Content
              value={writingContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleContentChange(e, POST_CONTENT)
              }
              placeholder={CONTENT_PLACEHOLDER}
              maxLength={POST_CONTENT.MAX_LENGTH}
              minLength={POST_CONTENT.MIN_LENGTH}
              onPaste={handlePasteImage}
              required
            />
            <S.ContentLinkButtonWrapper>
              <S.Button onClick={handleInsertContentLink} type="button">
                본문에 링크 넣기
              </S.Button>
            </S.ContentLinkButtonWrapper>
            <S.ContentImagePartWrapper $hasImage={!!contentImageHook.contentImage}>
              <ContentImagePart size="lg" contentImageHook={contentImageHook} />
            </S.ContentImagePartWrapper>
          </S.LeftSide>
          <S.RightSide>
            <S.OptionListWrapper>
              <WritingVoteOptionList writingOptionHook={writingOptionHook} />
            </S.OptionListWrapper>
            <S.Deadline aria-label="마감시간 설정">
              <S.DeadlineDescription
                aria-label={getDeadlineTime({
                  hour: time.hour,
                  day: time.day,
                  minute: time.minute,
                })}
                aria-live="polite"
              >
                {getDeadlineTime({ hour: time.hour, day: time.day, minute: time.minute })}
                {data && (
                  <S.Description tabIndex={0}>
                    현재 시간으로부터 글 작성일({createTime})로부터 {MAX_DEADLINE}일 이내 (
                    {addTimeToDate({ day: MAX_DEADLINE, hour: 0, minute: 0 }, baseTime)})까지만 선택
                    가능합니다.
                  </S.Description>
                )}
                {data && (
                  <S.Description tabIndex={0}>
                    * 작성일시로부터 마감시간이 계산됩니다.
                  </S.Description>
                )}
                {data && (
                  <S.Description tabIndex={0}>* 기존 마감 시간은 {deadline}입니다. </S.Description>
                )}
              </S.DeadlineDescription>
              <S.ButtonWrapper>
                {DEADLINE_OPTION.map(option => (
                  <SquareButton
                    aria-label={option.name}
                    key={option.name}
                    type="button"
                    onClick={() => handleDeadlineButtonClick(option)}
                    theme={selectTimeOption === option.name ? 'fill' : 'blank'}
                  >
                    {option.name}
                  </SquareButton>
                ))}
                {
                  <SquareButton
                    type="button"
                    onClick={openComponent}
                    theme={selectTimeOption === '사용자지정' ? 'fill' : 'blank'}
                  >
                    사용자 지정
                  </SquareButton>
                }
              </S.ButtonWrapper>
            </S.Deadline>
            <S.SaveButtonWrapper>
              <SquareButton
                aria-label="글쓰기가 저장됩니다. 저장이 완료되면 메인화면으로 이동됩니다."
                theme="fill"
                type="submit"
                form="form-post"
              >
                저장
              </SquareButton>
            </S.SaveButtonWrapper>
          </S.RightSide>
        </S.Wrapper>
        {isOpen && (
          <Modal size="sm" onModalClose={closeModal} aria-label="마감시간 설정 모달">
            <>
              <S.ModalHeader>
                <h3>마감 시간 선택</h3>
                <S.CloseButton onClick={closeModal} aria-label="마감시간 설정 모달 끄기">
                  X
                </S.CloseButton>
              </S.ModalHeader>
              <S.ModalBody>
                <S.Description aria-label={POST_DEADLINE_POLICY.DEFAULT} tabIndex={0}>
                  {POST_DEADLINE_POLICY.DEFAULT}
                </S.Description>
                <TimePickerOptionList time={time} setTime={setTime} />
                <S.ResetButtonWrapper>
                  <SquareButton
                    aria-label="마감시간 초기화"
                    onClick={handleResetButton}
                    type="button"
                    theme="blank"
                  >
                    초기화
                  </SquareButton>
                </S.ResetButtonWrapper>
              </S.ModalBody>
            </>
          </Modal>
        )}
      </form>
      {isToastOpen && (
        <Toast size="md" position="bottom">
          {toastMessage}
        </Toast>
      )}
    </>
  );
}
