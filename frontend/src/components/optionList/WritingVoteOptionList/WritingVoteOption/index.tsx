import React from 'react';

import { styled } from 'styled-components';

import OptionCancelButton from './OptionCancelButton';
import OptionUploadImageButton from './OptionUploadImageButton';

interface WritingVoteOptionProps {
  text: string;
  isDeletable: boolean;
  imageUrl?: string;
}

const Container = styled.li`
  display: flex;
  gap: 10px;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 20px;
  border-radius: 4px;

  background-color: #e6e6e6;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const ContentTextArea = styled.textarea`
  width: 100%;
  margin-right: 10px;
  padding: 8px;

  font-size: 1.3rem;
  line-height: 2.4rem;

  background-color: #e6e6e6;

  resize: none;
`;

const ImageContainer = styled.div`
  width: 80%;
  margin-top: 20px;

  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 4px;

  aspect-ratio: 1/1;
  object-fit: cover;
`;

const ImageCancelWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export default function WritingVoteOption({ text, isDeletable, imageUrl }: WritingVoteOptionProps) {
  return (
    <Container>
      {isDeletable && (
        <div title="선택지 삭제하기">
          <OptionCancelButton />
        </div>
      )}
      <OptionContainer>
        <ContentContainer>
          <ContentTextArea
            value={text}
            placeholder="내용을 입력해주세요."
            rows={2}
            maxLength={50}
          />
          {!imageUrl && <OptionUploadImageButton />}
        </ContentContainer>
        {imageUrl && (
          <ImageContainer>
            <Image src={imageUrl} alt={text} />
            <ImageCancelWrapper>
              <OptionCancelButton />
            </ImageCancelWrapper>
          </ImageContainer>
        )}
      </OptionContainer>
    </Container>
  );
}
