import type { UseMutateFunction } from '@tanstack/react-query';

import React, { HTMLAttributes, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostInfo } from '@type/post';

import { useToggle } from '@hooks/useToggle';

import Modal from '@components/common/Modal';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import SquareButton from '@components/common/SquareButton';
import TimePickerOptionList from '@components/common/TimePickerOptionList';
import WritingVoteOptionList from '@components/optionList/WritingVoteOptionList';

import { addTimeToDate, formatTimeWithOption } from '@utils/post/formatTime';

import { DEADLINE_OPTION } from './constants';
import * as S from './style';

interface PostFormProps extends HTMLAttributes<HTMLFormElement> {
  data?: PostInfo;
  mutate: UseMutateFunction<any, unknown, FormData, unknown>;
  isError: boolean;
  error: unknown;
}

export default function PostForm({ data, mutate, isError, error }: PostFormProps) {
  const {
    title,
    content,
    category: categoryIds,
    startTime,
    endTime: deadline,
    voteInfo,
  } = data ?? {};

  const navigate = useNavigate();

  const { isOpen, openComponent, closeComponent } = useToggle();
  const [time, setTime] = useState({
    day: 0,
    hour: 0,
    minute: 0,
  });
  const [writingTitle, setWritingTitle] = useState(title);
  const [writingContent, setWritingContent] = useState(content);

  const handleDeadlineButtonClick = (option: string) => {
    setTime(formatTimeWithOption(option));
  };

  const handleResetBUtton = () => {
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

    if (e.target instanceof HTMLFormElement) {
      const optionImageFileInputs =
        e.target.querySelectorAll<HTMLInputElement>('input[type="file"]');
      const fileInputList: HTMLInputElement[] = [...optionImageFileInputs];
      const imageFileList: File[] = []; ///////////////
      fileInputList.forEach(item => {
        if (item.files) {
          imageFileList.push(item.files[0]);
        }
      });

      imageFileList.map(file => formData.append('images', file));

      const optionTextAreas = e.target.querySelectorAll('textarea[name="optionText"]');
      const writingOptionTexts = Array.from(optionTextAreas).map((textarea: any) => textarea.value);

      const baseTime = startTime ? new Date(startTime) : new Date();

      const updatedPostTexts = {
        categoryIds: [1, 2],
        title: writingTitle ?? '',
        content: writingContent ?? '',
        postOptions: writingOptionTexts,
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

  return (
    <>
      <NarrowTemplateHeader>
        <S.HeaderButton onClick={() => navigate('/')}>취소</S.HeaderButton>
        <S.HeaderButton type="submit" form="form-post">
          저장
        </S.HeaderButton>
      </NarrowTemplateHeader>
      <S.Form id="form-post" onSubmit={handlePostFormSubmit}>
        <S.Wrapper>
          <select>
            {categoryIds && categoryIds.map(({ id, name }) => <option key={id}>{name}✅</option>)}
            <option>카테고리1</option>
            <option>카테고리2</option>
          </select>
          <S.Title
            value={writingTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWritingTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
            maxLength={100}
            required
          />
          <S.Content
            value={writingContent}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setWritingContent(e.target.value)
            }
            placeholder="내용을 입력해주세요"
            maxLength={1000}
            required
          />
          <S.OptionListWrapper>
            <WritingVoteOptionList initialOptionList={voteInfo && voteInfo.options} />
            {data && <S.Deadline>기존 마감 시간: {deadline}</S.Deadline>}
            <S.Deadline>
              {time.day}일 {time.hour}시 {time.minute}분 후에 마감됩니다.
            </S.Deadline>
            <S.ButtonWrapper>
              {DEADLINE_OPTION.map(option => (
                <SquareButton
                  key={option}
                  type="button"
                  onClick={() => handleDeadlineButtonClick(option)}
                  theme="blank"
                >
                  {option}
                </SquareButton>
              ))}
              <SquareButton type="button" onClick={openComponent} theme="blank">
                사용자 지정
              </SquareButton>
            </S.ButtonWrapper>
          </S.OptionListWrapper>
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
                  <SquareButton onClick={handleResetBUtton} theme="blank">
                    초기화
                  </SquareButton>
                </S.ResetButtonWrapper>
              </S.ModalBody>
            </>
          </Modal>
        )}
      </S.Form>
    </>
  );
}
