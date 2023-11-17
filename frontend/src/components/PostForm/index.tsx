import type { UseMutateFunction } from '@tanstack/react-query';

import React, { HTMLAttributes, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { ResponsiveFlex } from 'votogether-design-system';

import { ModalButton } from '@type/modalButton';
import { PostInfo } from '@type/post';

import { useMultiSelect, useContentImage, useText, useToggle, useWritingOption } from '@hooks';

import { ToastContext } from '@hooks/context/toast';
import { useDeadline } from '@hooks/useDeadline';

import HeaderTextButton from '@components/common/HeaderTextButton';
import Modal from '@components/common/Modal';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import SquareButton from '@components/common/SquareButton';
import TimePickerOptionList from '@components/common/TimePickerOptionList';
import WritingVoteOptionList from '@components/optionList/WritingVoteOptionList';

import { PATH } from '@constants/path';
import { MAX_DEADLINE, POST_CATEGORY, POST_CONTENT, POST_TITLE } from '@constants/policy';
import {
  CONTENT_PLACEHOLDER,
  POST_DEADLINE_POLICY,
  POST_TITLE_POLICY,
} from '@constants/policyMessage';

import { checkWriter } from '@utils/post/checkWriter';
import { convertToFormData } from '@utils/post/convertToFormData';
import { getDeadlineMessage } from '@utils/post/getDeadlineMessage';
import { checkIrreplaceableTime } from '@utils/time/checkIrreplaceableTime';

import { theme } from '@styles/theme';

import CategoryWrapper from './CategoryWrapper';
import { DEADLINE_OPTION, DeadlineOptionInfo } from './constants';
import ContentImagePart from './ContentImageSection';
import * as S from './style';
import { WritingPostInfo } from './type';
import { checkValidationPost } from './validation';
interface PostFormProps extends HTMLAttributes<HTMLFormElement> {
  data?: PostInfo;
  mutate: UseMutateFunction<any, unknown, FormData, unknown>;
  isSubmitting: boolean;
}

export default function PostForm({ data, mutate, isSubmitting }: PostFormProps) {
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

  //기타 훅
  const navigate = useNavigate();
  const { addMessage } = useContext(ToastContext);
  const { isOpen: isModalOpen, openComponent, closeComponent: closeModal } = useToggle();

  //게시글 정보 관련 훅
  const contentImageHook = useContentImage(serverImageUrl);
  const { handlePasteImage } = contentImageHook;

  const categorySelectHook = useMultiSelect(categoryIds ?? [], POST_CATEGORY.MAX_AMOUNT);
  const { text: writingTitle, handleTextChange: handleTitleChange } = useText(title ?? '');
  const { text: writingContent, handleTextChange: handleContentChange } = useText(content ?? '');
  const writingOptionHook = useWritingOption(
    serverVoteInfo?.options.map(option => ({
      ...option,
      imageUrl: option.imageUrl ?? '',
    }))
  );

  //마감시간 관련 훅
  const {
    userSelectedDHMTime,
    selectedTimeOption,
    changeDeadlineOption,
    changeDeadlinePicker,
    resetDeadline,
    getFinalDeadline,
    getLimitDeadline,
  } = useDeadline(createTime, deadline);

  if (deadline && Number(new Date(deadline)) < Date.now()) {
    addMessage('마감완료된 게시물은 수정할 수 없습니다.');
    return <Navigate to={PATH.HOME} />;
  }

  if (postId && writer && !checkWriter(writer.id)) {
    addMessage('사용자가 작성한 글만 수정할 수 있습니다.');
    return <Navigate to={PATH.HOME} />;
  }

  if (serverVoteInfo && serverVoteInfo.allPeopleCount !== 0) {
    addMessage('투표한 사용자가 있어 글 수정이 불가합니다.');
    return <Navigate to={PATH.HOME} />;
  }

  // 마감시간 관련 핸들러
  const handleDeadlineButtonClick = (option: DeadlineOptionInfo) => {
    if (data && checkIrreplaceableTime(option.time, data.createTime))
      return addMessage('마감시간 지정 조건을 다시 확인해주세요.');

    changeDeadlineOption(option);
  };

  const handleResetButton = () => {
    if (window.confirm('정말 초기화하시겠습니까?')) {
      resetDeadline();
    }
  };

  const handleModalClose = () => {
    if (data && checkIrreplaceableTime(userSelectedDHMTime, data.createTime)) {
      addMessage('마감시간 지정 조건을 다시 확인해주세요.');
      resetDeadline();
    }

    closeModal();
  };

  const handlePostFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (e.target instanceof HTMLFormElement) {
      const imageFileInputs = e.target.querySelectorAll<HTMLInputElement>('input[type="file"]');
      const fileInputList = [...imageFileInputs];

      const writingPostInfo: WritingPostInfo = {
        categoryOptionList: categorySelectHook.selectedOptionList,
        title: writingTitle,
        content: writingContent,
        imageUrl: contentImageHook.contentImage,
        optionList: writingOptionHook.optionList,
        deadline: getFinalDeadline(),
        fileInputList: fileInputList,
      };

      //예외처리
      const errorMessage = checkValidationPost(writingPostInfo);
      if (errorMessage) return addMessage(errorMessage);

      const formData = convertToFormData(writingPostInfo);

      mutate(formData);
    }
  };

  const primaryButton: ModalButton = {
    text: '저장',
    handleClick: handleModalClose,
    type: 'button',
  };

  const secondaryButton: ModalButton = {
    text: '초기화',
    handleClick: handleResetButton,
    type: 'button',
  };

  return (
    <>
      <S.HeaderWrapper>
        <NarrowTemplateHeader>
          <HeaderTextButton onClick={() => navigate('/')}>취소</HeaderTextButton>
          <HeaderTextButton type="submit" form="form-post" disabled={isSubmitting}>
            {isSubmitting ? '저장 중...' : '저장'}
          </HeaderTextButton>
        </NarrowTemplateHeader>
      </S.HeaderWrapper>
      <S.Form id="form-post" onSubmit={handlePostFormSubmit}>
        <ResponsiveFlex
          breakpoint={theme.breakpoint.sm}
          ratio={70}
          $smGap="20px"
          $lgGap="30px"
          $smPadding="60px 0px 0px 0px"
          $lgPadding="20px 80px 40px 60px"
        >
          <S.LeftSide $hasImage={!!contentImageHook.contentImage}>
            <CategoryWrapper multiSelectHook={categorySelectHook} />
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
                aria-label={getDeadlineMessage({
                  hour: userSelectedDHMTime.hour,
                  day: userSelectedDHMTime.day,
                  minute: userSelectedDHMTime.minute,
                })}
                aria-live="polite"
              >
                {getDeadlineMessage({
                  hour: userSelectedDHMTime.hour,
                  day: userSelectedDHMTime.day,
                  minute: userSelectedDHMTime.minute,
                })}
                {data && (
                  <S.Description tabIndex={0}>
                    현재 시간으로부터 글 작성일({createTime})로부터 {MAX_DEADLINE}일 이내 (
                    {getLimitDeadline()})까지만 선택 가능합니다.
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
                    theme={selectedTimeOption === option.name ? 'fill' : 'blank'}
                  >
                    {option.name}
                  </SquareButton>
                ))}
                {
                  <SquareButton
                    type="button"
                    onClick={openComponent}
                    theme={selectedTimeOption === '사용자지정' ? 'fill' : 'blank'}
                  >
                    사용자 지정
                  </SquareButton>
                }
              </S.ButtonWrapper>
            </S.Deadline>
            <S.SaveButtonWrapper>
              <SquareButton
                aria-label="글쓰기가 저장됩니다. 저장이 완료되면 메인화면으로 이동됩니다."
                theme={isSubmitting ? 'gray' : 'fill'}
                type="submit"
                form="form-post"
                disabled={isSubmitting}
              >
                저장
              </SquareButton>
            </S.SaveButtonWrapper>
          </S.RightSide>
        </ResponsiveFlex>
        {isModalOpen && (
          <Modal
            size="sm"
            primaryButton={primaryButton}
            secondaryButton={secondaryButton}
            aria-label="마감시간 설정 모달"
            handleModalClose={handleModalClose}
            title="마감 시간 선택"
          >
            <S.ModalBody>
              <S.Description aria-label={POST_DEADLINE_POLICY.DEFAULT} tabIndex={0}>
                {POST_DEADLINE_POLICY.DEFAULT}
              </S.Description>
              <TimePickerOptionList time={userSelectedDHMTime} setTime={changeDeadlinePicker} />
            </S.ModalBody>
          </Modal>
        )}
      </S.Form>
    </>
  );
}
