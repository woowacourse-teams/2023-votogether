import type { Meta } from '@storybook/react';

import { useRef } from 'react';

import WritingVoteOption from '.';

const meta: Meta<typeof WritingVoteOption> = {
  component: WritingVoteOption,
};

export default meta;

export const IsDeletable = () => {
  const ref = useRef([]);

  return (
    <WritingVoteOption
      ariaLabel=""
      imageUrl=""
      handleUpdateOptionChange={() => {}}
      handleDeleteOptionClick={() => {}}
      handleRemoveImageClick={() => {}}
      handleUploadImage={() => {}}
      handlePasteImage={() => {}}
      optionId={Math.floor(Math.random() * 100000)}
      text="방학 때 강릉으로  강아지와 기차여행을 하려했지
  만 장마가 와서 취소했어요. 여행을 별로 좋"
      isDeletable={true}
      contentInputRefList={ref}
      index={0}
    />
  );
};

export const IsNotDeletable = () => {
  const ref = useRef([]);

  return (
    <WritingVoteOption
      ariaLabel=""
      imageUrl=""
      handleUpdateOptionChange={() => {}}
      handleDeleteOptionClick={() => {}}
      handleRemoveImageClick={() => {}}
      handleUploadImage={() => {}}
      handlePasteImage={() => {}}
      optionId={Math.floor(Math.random() * 100000)}
      text="방학 때 강릉으로  강아지와 기차여행을 하려했지
  만 장마가 와서 취소했어요. 여행을 별로 좋"
      isDeletable={false}
      contentInputRefList={ref}
      index={0}
    />
  );
};

export const ShowImage = () => {
  const ref = useRef([]);

  return (
    <WritingVoteOption
      ariaLabel=""
      handleUpdateOptionChange={() => {}}
      handleDeleteOptionClick={() => {}}
      handleRemoveImageClick={() => {}}
      handleUploadImage={() => {}}
      handlePasteImage={() => {}}
      optionId={Math.floor(Math.random() * 100000)}
      text="방학 때 강릉으로  강아지와 기차여행을 하려했지
  만 장마가 와서 취소했어요. 여행을 별로 좋"
      isDeletable={true}
      imageUrl="https://source.unsplash.com/random"
      contentInputRefList={ref}
      index={0}
    />
  );
};
