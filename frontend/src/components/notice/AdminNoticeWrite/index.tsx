import { ChangeEvent, FormEvent, useState } from 'react';

import { Notice, NoticeRequest } from '@type/notice';
import { StringDate } from '@type/time';

import { useText } from '@hooks';

import { InputLengthRange } from '@hooks/useText';

import SquareButton from '@components/common/SquareButton';

import { addTimeToDate } from '@utils/post/addTimeToDate';

import * as S from './style';

interface AdminNoticeWriteProps {
  notice: Notice;
  writeType: '수정' | '작성';
  writeNotice: (notice: NoticeRequest) => void;
}

export default function AdminNoticeWrite({
  notice,
  writeType,
  writeNotice,
}: AdminNoticeWriteProps) {
  const title = useText(notice.title);
  const content = useText(notice.content);
  const bannerTitle = useText(notice.bannerTitle);
  const bannerSubTitle = useText(notice.bannerSubtitle);
  const [deadline, setDeadline] = useState<StringDate>(notice.deadline);

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    /**
     * 2023-11-01T17:26 와 같은 형식인 데이터
     */
    const updatedDeadline = event.currentTarget.value.replace('T', ' ') as StringDate;
    setDeadline(updatedDeadline);
  };

  return (
    <S.Container
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const notice: NoticeRequest = {
          title: title.text,
          content: content.text,
          deadline,
          bannerTitle: bannerTitle.text,
          bannerSubtitle: bannerSubTitle.text,
        };

        writeNotice(notice);
      }}
    >
      <S.Title>공지사항 {writeType} 페이지</S.Title>
      <CustomTextarea label="제목" {...title} limit={100} />
      <CustomTextarea label="내용" {...content} limit={3000} rows={20} />
      <CustomTextarea label="배너 제목" {...bannerTitle} limit={100} />
      <CustomTextarea label="배너 부제목" {...bannerSubTitle} limit={100} />
      <S.TextareaContainer>
        <S.Label htmlFor="deadline">마감기한</S.Label>
        <S.DateInput
          id="deadline"
          value={deadline}
          onChange={handleDateChange}
          type="datetime-local"
          min={addTimeToDate({ day: 0, hour: 0, minute: 0 }, new Date())}
          required
        />
      </S.TextareaContainer>
      <S.ButtonWrapper>
        <SquareButton theme="fill">제출</SquareButton>
      </S.ButtonWrapper>
    </S.Container>
  );
}

interface CustomInputProps {
  label: string;
  handleTextChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    limit: InputLengthRange
  ) => void;
  limit: number;
  text: string;
  rows?: number;
}

function CustomTextarea({ label, handleTextChange, text, limit, rows = 10 }: CustomInputProps) {
  return (
    <S.TextareaContainer>
      <S.Label htmlFor={label}>
        {label} ({text.length}/{limit})
      </S.Label>
      <S.Textarea
        rows={rows}
        id={label}
        value={text}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          handleTextChange(event, { MAX_LENGTH: limit, MIN_LENGTH: 0 })
        }
        maxLength={limit}
        required
      />
    </S.TextareaContainer>
  );
}
