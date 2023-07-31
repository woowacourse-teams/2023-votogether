import type { UseMutateFunction } from '@tanstack/react-query';

import React, { HTMLAttributes, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostInfo } from '@type/post';

import { useContentImage } from '@hooks/useContentImage';
import { useText } from '@hooks/useText';
import { useToggle } from '@hooks/useToggle';
import { useWritingOption } from '@hooks/useWritingOption';

import Modal from '@components/common/Modal';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import SquareButton from '@components/common/SquareButton';
import TimePickerOptionList from '@components/common/TimePickerOptionList';
import WritingVoteOptionList from '@components/optionList/WritingVoteOptionList';

import { addTimeToDate, formatTimeWithOption } from '@utils/post/formatTime';

import { DEADLINE_OPTION } from './constants';
import ContentImagePart from './ContentImageSection';
import * as S from './style';

interface PostFormProps extends HTMLAttributes<HTMLFormElement> {
  data?: PostInfo;
  mutate: UseMutateFunction<any, unknown, FormData, unknown>;
  isError: boolean;
  error: unknown;
}

const MAX_TITLE_LENGTH = 100;
const MAX_CONTENT_LENGTH = 1000;

export default function PostForm({ data, mutate, isError, error }: PostFormProps) {
  const {
    title,
    content,
    category: categoryIds,
    startTime,
    endTime: deadline,
    voteInfo,
    imageUrl,
  } = data ?? {};

  const navigate = useNavigate();
  const writingOptionHook = useWritingOption(voteInfo?.options);
  const contentImageHook = useContentImage(imageUrl);

  const { isOpen, openComponent, closeComponent } = useToggle();
  const [time, setTime] = useState({
    day: 0,
    hour: 0,
    minute: 0,
  });
  const baseTime = startTime ? new Date(startTime) : new Date();

  const { text: writingTitle, handleTextChange: handleTitleChange } = useText(title ?? '');
  const { text: writingContent, handleTextChange: handleContentChange } = useText(content ?? '');

  const handleDeadlineButtonClick = (option: string) => {
    setTime(formatTimeWithOption(option));
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
        if (imageUrlList[index] === '') item.value = '';
        if (item.files) {
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

      const updatedPostTexts = {
        categoryIds: [1, 2], // 다중 선택 컴포넌트 구현 후 수정 예정
        title: writingTitle ?? '',
        imageUrl: imageUrl ?? '',
        content: writingContent ?? '',
        postOptions: writingOptionList,
        deadline: addTimeToDate(time, baseTime),
        // 글 수정의 경우 작성시간을 기준으로 마감시간 옵션을 더한다.
        // 마감시간 옵션을 선택 안했다면 기존의 마감 시간을 유지한다.
      };
      formData.append('texts', JSON.stringify(updatedPostTexts));

      mutate(formData);

      if (isError && error instanceof Error) {
        alert(error.message);
        return;
      }

      navigate('/');
    }
  };

  const getDeadlineTime = ({
    day,
    hour,
    minute,
  }: {
    day: number;
    hour: number;
    minute: number;
  }) => {
    const timeMessage = [];

    if (day === 0 && hour === 0 && minute === 0) {
      return '마감 시간을 선택해주세요';
    }

    if (day > 0) {
      timeMessage.push(`${day}일`);
    }

    if (hour > 0) {
      timeMessage.push(`${hour}시간`);
    }

    if (minute > 0) {
      timeMessage.push(`${minute}분`);
    }

    return `${timeMessage.join(' ')}  후에 마감됩니다.`;
  };

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
            <select>
              {categoryIds && categoryIds.map(({ id, name }) => <option key={id}>{name}✅</option>)}
              <option>카테고리1</option>
              <option>카테고리2</option>
            </select>
            <S.Title
              value={writingTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(e, 100)}
              placeholder="제목을 입력해주세요"
              maxLength={MAX_TITLE_LENGTH}
              required
            />
            <S.Content
              value={writingContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleContentChange(e, 1000)}
              placeholder="내용을 입력해주세요"
              maxLength={MAX_CONTENT_LENGTH}
              required
            />
            <S.ContentImagePartWrapper $hasImage={!!contentImageHook.contentImage}>
              <ContentImagePart size="md" contentImageHook={contentImageHook} />
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
                    글 작성일({startTime})로부터 하루 이후 (
                    {addTimeToDate({ day: 1, hour: 0, minute: 0 }, baseTime)})까지만 선택
                    가능합니다.
                  </S.Description>
                )}
                {data && <S.Description>* 기존 마감 시간은 {deadline}입니다. </S.Description>}
              </S.DeadlineDescription>
              <S.ButtonWrapper>
                {DEADLINE_OPTION.map(option => (
                  <SquareButton
                    aria-label={option}
                    key={option}
                    type="button"
                    onClick={() => handleDeadlineButtonClick(option)}
                    theme="blank"
                  >
                    {option}
                  </SquareButton>
                ))}
                {
                  <SquareButton type="button" onClick={openComponent} theme="blank">
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
          <Modal size="sm" onModalClose={closeComponent}>
            <>
              <S.ModalHeader>
                <h3>마감 시간 선택</h3>
                <S.CloseButton onClick={closeComponent}>X</S.CloseButton>
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
    </>
  );
}
