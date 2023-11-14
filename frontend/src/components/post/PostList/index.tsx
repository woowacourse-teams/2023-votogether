import React, { MouseEvent, Suspense, useContext, useRef } from 'react';

import { useSelect } from '@hooks';

import { PostOptionContext } from '@hooks/context/postOption';

import ErrorBoundary from '@pages/ErrorBoundary';
import { SORTING_OPTION, STATUS_OPTION } from '@pages/HomePage/constants';
import { PostSorting, PostStatus } from '@pages/HomePage/types';

import Select from '@components/common/Select';
import Skeleton from '@components/common/Skeleton';

import { PATH } from '@constants/path';

import PostListFetcher from '../PostListFetcher';

import * as S from './style';

export default function PostList() {
  const topButtonRef = useRef<HTMLButtonElement>(null);

  const { postOption, setPostOption } = useContext(PostOptionContext);

  const {
    selectedOption: selectedStatusOption,
    handleOptionChange: handleStatusOptionChange,
    isSelectOpen: isStatusSelectOpen,
    toggleSelect: toggleStatusSelect,
    selectRef: statusSelectRef,
    handleCloseClick: handleStatusClose,
  } = useSelect<PostStatus>(postOption.status);
  const {
    selectedOption: selectedSortingOption,
    handleOptionChange: handleSortingOptionChange,
    isSelectOpen: isSortingSelectOpen,
    toggleSelect: toggleSortingSelect,
    selectRef: sortingSelectRef,
    handleCloseClick: handleSortingClose,
  } = useSelect<PostSorting>(postOption.sorting);

  const handleFocusTopContent = () => {
    if (!topButtonRef.current) return;

    topButtonRef.current.focus();
  };

  return (
    <S.Container
      onClick={(event: MouseEvent<HTMLDivElement>) => {
        handleStatusClose(event);
        handleSortingClose(event);
      }}
    >
      <button ref={topButtonRef} role="contentinfo" aria-label="최상단입니다" />
      <S.SelectContainer>
        <S.SelectWrapper ref={statusSelectRef}>
          <Select<PostStatus>
            isOpen={isStatusSelectOpen}
            toggleSelect={toggleStatusSelect}
            aria-label={`마감 여부로 게시글 정렬 선택, 현재 옵션은 ${STATUS_OPTION[selectedStatusOption]}`}
            handleOptionChange={async (value: PostStatus) => {
              if (value === selectedStatusOption) return;

              setPostOption({
                ...postOption,
                status: value,
              });

              handleStatusOptionChange(value);
            }}
            optionList={STATUS_OPTION}
            selectedOption={STATUS_OPTION[selectedStatusOption]}
          />
        </S.SelectWrapper>
        <S.SelectWrapper ref={sortingSelectRef}>
          <Select<PostSorting>
            isOpen={isSortingSelectOpen}
            toggleSelect={toggleSortingSelect}
            aria-label={`인기순/최신순으로 게시글 정렬 선택, 현재 옵션은 ${SORTING_OPTION[selectedSortingOption]}`}
            handleOptionChange={(value: PostSorting) => {
              if (value === selectedSortingOption) return;

              setPostOption({
                ...postOption,
                sorting: value,
              });
              handleSortingOptionChange(value);
            }}
            optionList={SORTING_OPTION}
            selectedOption={SORTING_OPTION[selectedSortingOption]}
          />
        </S.SelectWrapper>
      </S.SelectContainer>
      <ErrorBoundary hasIcon={true} hasRetryInteraction={true}>
        <Suspense
          fallback={
            <S.SkeletonWrapper>
              <Skeleton isLarge={true} />
            </S.SkeletonWrapper>
          }
        >
          <PostListFetcher handleFocusTopContent={handleFocusTopContent} />
        </Suspense>
      </ErrorBoundary>
      <S.HiddenLink aria-label="게시글 작성 페이지로 이동" to={PATH.POST_WRITE} />
    </S.Container>
  );
}
