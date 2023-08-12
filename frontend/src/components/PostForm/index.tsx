import type { UseMutateFunction } from '@tanstack/react-query';

import React, { HTMLAttributes, useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { PostInfo } from '@type/post';

import { AuthContext } from '@hooks/context/auth';
import { useCategoryList } from '@hooks/query/category/useCategoryList';
import { useContentImage } from '@hooks/useContentImage';
import { useMultiSelect } from '@hooks/useMultiSelect';
import { useText } from '@hooks/useText';
import { useToast } from '@hooks/useToast';
import { useToggle } from '@hooks/useToggle';
import { useWritingOption } from '@hooks/useWritingOption';

import Modal from '@components/common/Modal';
import MultiSelect from '@components/common/MultiSelect';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import SquareButton from '@components/common/SquareButton';
import TimePickerOptionList from '@components/common/TimePickerOptionList';
import Toast from '@components/common/Toast';
import WritingVoteOptionList from '@components/optionList/WritingVoteOptionList';

import { PATH } from '@constants/path';
import { POST_DESCRIPTION_MAX_LENGTH, POST_TITLE_MAX_LENGTH } from '@constants/post';

import { changeCategoryToOption } from '@utils/post/changeCategoryToOption';
import { checkWriter } from '@utils/post/checkWriter';
import { addTimeToDate, formatTimeWithOption } from '@utils/post/formatTime';
import { getDeadlineTime } from '@utils/post/getDeadlineTime';
import { checkIrreplaceableTime } from '@utils/time';

import { DEADLINE_OPTION, DeadlineOption } from './constants';
import ContentImagePart from './ContentImageSection';
import * as S from './style';

interface PostFormProps extends HTMLAttributes<HTMLFormElement> {
  data?: PostInfo;
  mutate: UseMutateFunction<any, unknown, FormData, unknown>;
}

const MAX_TITLE_LENGTH = 100;
const MAX_CONTENT_LENGTH = 1000;
const CATEGORY_COUNT_LIMIT = 3;

export default function PostForm({ data, mutate }: PostFormProps) {
  const {
    postId,
    title,
    content,
    category: categoryIds,
    createTime,
    deadline,
    voteInfo,
    imageUrl,
    writer,
  } = data ?? {};

  const navigate = useNavigate();
  const writingOptionHook = useWritingOption(voteInfo?.options);
  const contentImageHook = useContentImage(imageUrl);
  const { isLoggedIn: isLogged } = useContext(AuthContext).loggedInfo;
  const { data: categoryList } = useCategoryList(isLogged);
  const { isToastOpen, openToast, toastMessage } = useToast();
  const [selectTimeOption, setSelectTimeOption] = useState<DeadlineOption | '사용자지정'>();

  const { isOpen, openComponent, closeComponent } = useToggle();
  const [time, setTime] = useState({
    day: 0,
    hour: 0,
    minute: 0,
  });
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
      setSelectTimeOption(undefined);
    }

    setSelectTimeOption(Object.values(time).every(time => time === 0) ? undefined : '사용자지정');
    closeComponent();
  };

  const { text: writingTitle, handleTextChange: handleTitleChange } = useText(title ?? '');
  const { text: writingContent, handleTextChange: handleContentChange } = useText(content ?? '');
  const { selectedOptionList, handleOptionAdd, handleOptionDelete } = useMultiSelect(
    categoryIds ?? [],
    CATEGORY_COUNT_LIMIT
  );

  const categoryOptionList = changeCategoryToOption(categoryList ?? []);

  const handleDeadlineButtonClick = (option: DeadlineOption) => {
    const targetTime = formatTimeWithOption(option);

    if (data && checkIrreplaceableTime(targetTime, data.createTime))
      return openToast('마감시간 지정 조건을 다시 확인해주세요.');
    setSelectTimeOption(option);
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

  const handlePostFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    const imageUrlList = [
      contentImageHook.contentImage,
      ...writingOptionHook.optionList.map(option => option.imageUrl),
    ];

    if (e.target instanceof HTMLFormElement) {
      const optionImageFileInputs =
        e.target.querySelectorAll<HTMLInputElement>('input[type="file"]');
      const fileInputList: HTMLInputElement[] = [...optionImageFileInputs];
      const contentImageFileList: File[] = [];
      const optionImageFileList: File[] = [];
      fileInputList.forEach((item, index) => {
        if (!item.files) return;

        if (imageUrlList[index] === '') {
          index === 0
            ? contentImageFileList.push(new File(['없는사진'], '없는사진.jpg'))
            : optionImageFileList.push(new File(['없는사진'], '없는사진.jpg'));
        } else {
          index === 0
            ? contentImageFileList.push(item.files[0])
            : optionImageFileList.push(item.files[0]);
        }
      });

      contentImageFileList.map(file => formData.append('contentImages', file));
      optionImageFileList.map(file => formData.append('optionImages', file));

      const writingOptionList = writingOptionHook.optionList.map(({ text, imageUrl }, index) => {
        return { content: text, imageUrl: imageUrl };
      });

      //예외처리
      if (selectedOptionList.length < 1) return openToast('카테고리를 최소 1개 골라주세요.');
      if (selectedOptionList.length > 3) return openToast('카테고리를 최대 3개 골라주세요.');
      if (writingTitle.trim() === '') return openToast('제목은 필수로 입력해야 합니다.');
      if (writingContent.trim() === '') return openToast('내용은 필수로 입력해야 합니다.');
      if (writingOptionList.length < 2) return openToast('선택지는 최소 2개 입력해주세요.');
      if (writingOptionList.length > 5) return openToast('선택지는 최대 5개 입력할 수 있습니다.');
      if (writingOptionList.some(option => option.content.trim() === ''))
        return openToast('선택지에 글을 입력해주세요.');
      if (Object.values(time).reduce((a, b) => a + b, 0) < 1)
        return openToast('시간은 필수로 입력해야 합니다.');

      const updatedPostTexts = {
        categoryIds: selectedOptionList.map(option => option.id),
        title: writingTitle,
        imageUrl: contentImageHook.contentImage,
        content: writingContent,
        postOptions: writingOptionList,
        deadline: addTimeToDate(time, baseTime),
        // 글 수정의 경우 작성시간을 기준으로 마감시간 옵션을 더한다.
        // 마감시간 옵션을 선택 안했다면 기존의 마감 시간을 유지한다.
      };
      formData.append('request', JSON.stringify(updatedPostTexts));

      mutate(formData);
    }
  };

  if (postId && writer && !checkWriter(writer.id)) return <Navigate to={PATH.HOME} />;

  return (
    <>
      <S.HeaderWrapper>
        <NarrowTemplateHeader>
          <S.HeaderButton onClick={() => navigate('/')}>취소</S.HeaderButton>
          <S.HeaderButton type="submit" form="form-post">
            저장
          </S.HeaderButton>
        </NarrowTemplateHeader>
      </S.HeaderWrapper>
      <form id="form-post" onSubmit={handlePostFormSubmit}>
        <S.Wrapper>
          <S.LeftSide $hasImage={!!contentImageHook.contentImage}>
            <MultiSelect
              selectedOptionList={selectedOptionList}
              optionList={categoryOptionList}
              handleOptionAdd={handleOptionAdd}
              handleOptionDelete={handleOptionDelete}
              placeholder="카테고리를 선택해주세요."
            />
            <S.Title
              value={writingTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleTitleChange(e, POST_TITLE_MAX_LENGTH)
              }
              placeholder="제목을 입력해주세요"
              maxLength={MAX_TITLE_LENGTH}
              required
            />
            <S.Content
              value={writingContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleContentChange(e, POST_DESCRIPTION_MAX_LENGTH)
              }
              placeholder="내용을 입력해주세요"
              maxLength={MAX_CONTENT_LENGTH}
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
            <S.Deadline>
              <S.DeadlineDescription>
                {getDeadlineTime({ hour: time.hour, day: time.day, minute: time.minute })}
                {data && (
                  <S.Description>
                    현재 시간으로부터 글 작성일({createTime})로부터 3일 이내 (
                    {addTimeToDate({ day: 3, hour: 0, minute: 0 }, baseTime)})까지만 선택
                    가능합니다.
                  </S.Description>
                )}
                {data && <S.Description>* 작성일시로부터 마감시간이 계산됩니다. </S.Description>}
                {data && <S.Description>* 기존 마감 시간은 {deadline}입니다. </S.Description>}
              </S.DeadlineDescription>
              <S.ButtonWrapper>
                {DEADLINE_OPTION.map(option => (
                  <SquareButton
                    aria-label={option}
                    key={option}
                    type="button"
                    onClick={() => handleDeadlineButtonClick(option)}
                    theme={selectTimeOption === option ? 'fill' : 'blank'}
                  >
                    {option}
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
              <SquareButton theme="fill" type="submit" form="form-post">
                저장
              </SquareButton>
            </S.SaveButtonWrapper>
          </S.RightSide>
        </S.Wrapper>
        {isOpen && (
          <Modal size="sm" onModalClose={closeModal}>
            <>
              <S.ModalHeader>
                <h3>마감 시간 선택</h3>
                <S.CloseButton onClick={closeModal}>X</S.CloseButton>
              </S.ModalHeader>
              <S.ModalBody>
                <S.Description>최대 3일을 넘을 수 없습니다.</S.Description>
                <TimePickerOptionList time={time} setTime={setTime} />
                <S.ResetButtonWrapper>
                  <SquareButton onClick={handleResetButton} type="button" theme="blank">
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
