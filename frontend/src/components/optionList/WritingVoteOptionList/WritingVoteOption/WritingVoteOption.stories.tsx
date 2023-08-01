import type { Meta, StoryObj } from '@storybook/react';

import WritingVoteOption from '.';

const meta: Meta<typeof WritingVoteOption> = {
  component: WritingVoteOption,
};

export default meta;
type Story = StoryObj<typeof WritingVoteOption>;

export const IsDeletable: Story = {
  render: () => (
    <WritingVoteOption
      imageUrl=""
      handleUpdateOptionChange={() => {}}
      handleDeleteOptionClick={() => {}}
      handleRemoveImageClick={() => {}}
      handleUploadImage={() => {}}
      optionId={Math.floor(Math.random() * 100000)}
      text="방학 때 강릉으로  강아지와 기차여행을 하려했지
  만 장마가 와서 취소했어요. 여행을 별로 좋"
      isDeletable={true}
    />
  ),
};

export const IsNotDeletable: Story = {
  render: () => (
    <WritingVoteOption
      imageUrl=""
      handleUpdateOptionChange={() => {}}
      handleDeleteOptionClick={() => {}}
      handleRemoveImageClick={() => {}}
      handleUploadImage={() => {}}
      optionId={Math.floor(Math.random() * 100000)}
      text="방학 때 강릉으로  강아지와 기차여행을 하려했지
  만 장마가 와서 취소했어요. 여행을 별로 좋"
      isDeletable={false}
    />
  ),
};

export const ShowImage: Story = {
  render: () => (
    <WritingVoteOption
      handleUpdateOptionChange={() => {}}
      handleDeleteOptionClick={() => {}}
      handleRemoveImageClick={() => {}}
      handleUploadImage={() => {}}
      optionId={Math.floor(Math.random() * 100000)}
      text="방학 때 강릉으로  강아지와 기차여행을 하려했지
  만 장마가 와서 취소했어요. 여행을 별로 좋"
      isDeletable={true}
      imageUrl="https://source.unsplash.com/random"
    />
  ),
};
