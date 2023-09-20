import { ChangeEvent, MutableRefObject } from 'react';

import { WritingVoteOptionType } from '@hooks/useWritingOption';

import AddButton from '@components/common/AddButton';

import * as S from './style';
import WritingVoteOption from './WritingVoteOption';

const MINIMUM_COUNT = 2;
const MAXIMUM_COUNT = 5;

interface WritingVoteOptionListProps {
  writingOptionHook: {
    optionList: WritingVoteOptionType[];
    addOption: () => void;
    writingOption: (
      optionId: number
    ) => (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    deleteOption: (optionId: number) => void;
    removeImage: (optionId: number) => void;
    handleUploadImage: (event: ChangeEvent<HTMLInputElement>, optionId: number) => void;
    contentInputRefList: MutableRefObject<HTMLInputElement[]>;
  };
}

export default function WritingVoteOptionList({ writingOptionHook }: WritingVoteOptionListProps) {
  const {
    optionList,
    addOption,
    writingOption,
    deleteOption,
    removeImage,
    handleUploadImage,
    contentInputRefList,
  } = writingOptionHook;
  const isDeletable = optionList.length > MINIMUM_COUNT;

  return (
    <S.Container aria-label={`${optionList.length}개의 선택지가 있습니다.`} aria-live="polite">
      {optionList.map((optionItem, index) => (
        <WritingVoteOption
          key={optionItem.id}
          ariaLabel={`${index + 1}번 선택지`}
          optionId={optionItem.id}
          isDeletable={isDeletable}
          text={optionItem.text}
          handleUpdateOptionChange={writingOption(optionItem.id)}
          handleDeleteOptionClick={() => deleteOption(optionItem.id)}
          handleRemoveImageClick={() => removeImage(optionItem.id)}
          handleUploadImage={(event: ChangeEvent<HTMLInputElement>) =>
            handleUploadImage(event, optionItem.id)
          }
          imageUrl={optionItem.imageUrl}
          contentInputRefList={contentInputRefList}
          index={index}
        />
      ))}
      {optionList.length < MAXIMUM_COUNT && (
        <S.AddButtonWrapper>
          <AddButton type="button" size="md" aria-label="선택지 추가" onClick={addOption} />
        </S.AddButtonWrapper>
      )}
    </S.Container>
  );
}
