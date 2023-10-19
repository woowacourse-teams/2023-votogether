import type { UseMutateFunction } from '@tanstack/react-query';

import React, { HTMLAttributes, useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { ResponsiveFlex } from 'votogether-design-system';

import { PostInfo } from '@type/post';

import { useMultiSelect, useContentImage, useText, useToggle, useWritingOption } from '@hooks';

import { ToastContext } from '@hooks/context/toast';

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

import { deleteOverlappingNewLine } from '@utils/deleteOverlappingNewLine';
import { addTimeToDate } from '@utils/post/addTimeToDate';
import { calculateDeadlineDHMTime } from '@utils/post/calculateDeadlineDHMTime';
import { checkWriter } from '@utils/post/checkWriter';
import { getDeadlineMessage } from '@utils/post/getDeadlineMessage';
import { getSelectedDHMTimeOption } from '@utils/post/getSelectedTimeOption';
import { checkIrreplaceableTime } from '@utils/time/checkIrreplaceableTime';

import { theme } from '@styles/theme';

import CategoryWrapper from './CategoryWrapper';
import { DEADLINE_OPTION, DeadlineOptionInfo, DeadlineOptionName } from './constants';
import ContentImagePart from './ContentImageSection';
import * as S from './style';
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

  //마감시간 관련 코드
  const deadlineDHMTime = calculateDeadlineDHMTime(createTime, deadline);
  const baseTime = createTime ? new Date(createTime) : new Date();

  const [selectTimeOption, setSelectTimeOption] = useState<
    DeadlineOptionName | '사용자지정' | null
  >(getSelectedDHMTimeOption(deadlineDHMTime));
  const [userSelectTime, setUserSelectTime] = useState(deadlineDHMTime);

  if (postId && writer && !checkWriter(writer.id)) return <Navigate to={PATH.HOME} />;

  // 마감시간 관련 핸들러
  const handleDeadlineButtonClick = (option: DeadlineOptionInfo) => {
    const targetTime = option.time;

    if (data && checkIrreplaceableTime(targetTime, data.createTime))
      return addMessage('마감시간 지정 조건을 다시 확인해주세요.');
    setSelectTimeOption(option.name);
    setUserSelectTime(targetTime);
  };

  const handleResetButton = () => {
    if (window.confirm('정말 초기화하시겠습니까?')) {
      const updatedTime = {
        day: 0,
        hour: 0,
        minute: 0,
      };
      setUserSelectTime(updatedTime);
    }
  };

  const handleModalClose = () => {
    if (data && checkIrreplaceableTime(userSelectTime, data.createTime)) {
      addMessage('마감시간 지정 조건을 다시 확인해주세요.');
      const updatedTime = {
        day: 0,
        hour: 0,
        minute: 0,
      };
      setUserSelectTime(updatedTime);
      setSelectTimeOption(null);
    }

    setSelectTimeOption(
      Object.values(userSelectTime).every(time => time === 0) ? null : '사용자지정'
    );
    closeModal();
  };

  const handlePostFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    //예외처리
    const { selectedOptionList } = categorySelectHook;
    const errorMessage = checkValidationPost(
      selectedOptionList,
      writingTitle,
      writingContent,
      writingOptionHook.optionList,
      userSelectTime
    );
    if (errorMessage) return addMessage(errorMessage);

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
      formData.append('deadline', addTimeToDate(userSelectTime, baseTime));

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

  const primaryButton = {
    text: '저장',
    handleClick: closeModal,
  };

  const secondaryButton = {
    text: '초기화',
    handleClick: handleResetButton,
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
      <form id="form-post" onSubmit={handlePostFormSubmit}>
        <ResponsiveFlex
          breakpoint={theme.breakpoint.sm}
          ratio={70}
          $smGap="20px"
          $lgGap="30px"
          $smPadding="60px 15px 0px 0px"
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
                  hour: userSelectTime.hour,
                  day: userSelectTime.day,
                  minute: userSelectTime.minute,
                })}
                aria-live="polite"
              >
                {getDeadlineMessage({
                  hour: userSelectTime.hour,
                  day: userSelectTime.day,
                  minute: userSelectTime.minute,
                })}
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
              <TimePickerOptionList time={userSelectTime} setTime={setUserSelectTime} />
            </S.ModalBody>
          </Modal>
        )}
      </form>
    </>
  );
}
