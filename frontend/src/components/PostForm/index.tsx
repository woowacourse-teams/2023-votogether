import React, { HTMLAttributes, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PostRequest } from '@type/post';

import { useToggle } from '@hooks/useToggle';

import Modal from '@components/common/Modal';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import SquareButton from '@components/common/SquareButton';
import TimePickerOptionList from '@components/common/TimePickerOptionList';
import WritingVoteOptionList from '@components/optionList/WritingVoteOptionList';

import { addTimeToCurrentDate, formatTimeWithOption } from '@utils/formatTime';

import { DEADLINE_OPTION } from './constants';
import * as S from './style';

interface PostFormProps extends HTMLAttributes<HTMLFormElement> {
  data?: PostRequest;
  mutate: any;
}

export default function PostForm({ data, mutate }: PostFormProps) {
  const { categoryIds, title, content, postOptions, deadline } = data ?? {
    categoryIds: [],
    title: '',
    content: '',
    postOptions: [],
    deadline: '',
  };
  const navigate = useNavigate();
  const { postId } = useParams() as { postId: string };

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
    // formatTimeWithOption => '10분 후' 라는 option 이면 {day: 0, hour: 0, minute: 10} 라는 객체 반환
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

    const updatedPost: PostRequest = {
      categoryIds: [1, 2],
      title: writingTitle,
      content: writingContent,
      postOptions: [
        {
          id: 1234221,
          text: '귀여운 강아지',
          imageUrl: '',
        },
        {
          id: 1834221,
          text: '아기 고양이',
          imageUrl: '',
        },
      ],
      deadline: addTimeToCurrentDate(time) ?? deadline,
    };

    if (postId) mutate(postId, updatedPost);
    else mutate(updatedPost);

    // window.console.log('submitted!', updatedPost);
    // window.console.log('original deadline was...', deadline);
    navigate('/');
  };

  return (
    <S.Form onSubmit={handlePostFormSubmit}>
      <NarrowTemplateHeader>
        <S.HeaderButton onClick={() => navigate('/')}>취소</S.HeaderButton>
        <S.HeaderButton>저장</S.HeaderButton>
      </NarrowTemplateHeader>
      <S.Wrapper>
        <select>
          {categoryIds && categoryIds.map(category => <option>{category}✅</option>)}
          <option>카테고리1</option>
          <option>카테고리2</option>
        </select>
        <S.Title
          value={writingTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWritingTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          required
        />
        <S.Content
          value={writingContent}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setWritingContent(e.target.value)
          }
          placeholder="내용을 입력해주세요"
          required
        />
        <S.OptionListWrapper>
          <WritingVoteOptionList initialOptionList={postOptions} />
          {data && <S.Deadline>기존 마감 시간: {deadline}</S.Deadline>}
          <S.Deadline>
            {time.day}일 {time.hour}시 {time.minute}분 후에 마감됩니다.
          </S.Deadline>
          <S.ButtonWrapper>
            {DEADLINE_OPTION.map(option => (
              <SquareButton
                key={option}
                onClick={() => handleDeadlineButtonClick(option)}
                theme="blank"
              >
                {option}
              </SquareButton>
            ))}
            <SquareButton onClick={openComponent} theme="blank">
              사용자 지정
            </SquareButton>
          </S.ButtonWrapper>
        </S.OptionListWrapper>
      </S.Wrapper>
      {isOpen && (
        <Modal size="sm" onModalClose={closeComponent}>
          <>
            <S.Header>
              <h3>마감 시간 선택</h3>
              <S.CloseButton onClick={closeComponent}>X</S.CloseButton>
            </S.Header>
            <S.Body>
              <S.Description>최대 3일을 넘을 수 없습니다.</S.Description>
              <TimePickerOptionList time={time} setTime={setTime} />
              <S.ResetButtonWrapper>
                <SquareButton onClick={handleResetBUtton} theme="blank">
                  초기화
                </SquareButton>
              </S.ResetButtonWrapper>
            </S.Body>
          </>
        </Modal>
      )}
    </S.Form>
  );
}
