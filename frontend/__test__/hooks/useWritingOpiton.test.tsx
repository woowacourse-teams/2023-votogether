import { renderHook, act } from '@testing-library/react';

const MOCK_MAX_VOTE_OPTION = [
  { id: 12341, text: '', imageUrl: '' },
  { id: 12341, text: '', imageUrl: '' },
  {
    id: 1234221,
    text: '방학 때 강릉으로  강아지와 기차여행을 하려했지만 장마가 와서 취소했어요. 여행을 별로 좋',
    imageUrl: '',
  },
  {
    id: 1234221,
    text: '방학 때 강릉으로  강아지와 기차여행을 하려했지만 장마가 와서 취소했어요. 여행을 별로 좋',
    imageUrl: 'https://source.unsplash.com/random',
  },
  {
    id: 1234451,
    text: '',
    imageUrl: 'https://source.unsplash.com/random',
  },
];

const MOCK_MIN_VOTE_OPTION = [
  { id: 12341, text: '', imageUrl: '' },
  { id: 12341, text: '', imageUrl: '' },
];
describe('useWritingOption 훅을 테스트 한다.', () => {
  test('초기 값으로 투표 선택지를 설정할 수 있어야 한다.(수정 기능 시 이용)', () => {
    const { result } = renderHook(() => useWritingOpiton(MOCK_MIN_VOTE_OPTION));

    const { optionList } = result.current;

    expect(optionList).toBe(MOCK_MIN_VOTE_OPTION);
  });

  test('투표 선택지를 추가할 수 있어야 한다. 생성된 선택지는 text와 imageUrl 값을 가지고 있다.', () => {
    const { result } = renderHook(() => useWritingOpiton(MOCK_MIN_VOTE_OPTION));

    const { addOption } = result.current;

    act(() => {
      addOption();
    });

    const { optionList } = result.current;

    expect(optionList.length).toBe(MOCK_MIN_VOTE_OPTION.length + 1);

    expect(optionList[2].text).toBe('');

    expect(optionList[2].imageUrl).toBe('');
  });

  test('투표 선택지가 5개일 땐 투표 선택지를 추가할 수 없다', () => {
    const { result } = renderHook(() => useWritingOpiton(MOCK_MAX_VOTE_OPTION));

    const { addOption } = result.current;

    act(() => {
      addOption();
    });

    const { optionList } = result.current;

    expect(optionList).toBe(MOCK_MAX_VOTE_OPTION);
  });

  test('투표 선택지가 3개 이상일때는 투표 선택지의 아이디를 이용하여 삭제할 수 있다.', () => {
    const { result } = renderHook(() => useWritingOpiton(MOCK_MAX_VOTE_OPTION));

    const { deleteOption } = result.current;

    act(() => {
      deleteOption(MOCK_MIN_VOTE_OPTION[0].id);
    });

    const { optionList } = result.current;

    expect(optionList).toBe(MOCK_MAX_VOTE_OPTION.slice(1, 4));
  });

  test('투표 선택지가 2개일때는 삭제할 수 없다.', () => {
    const { result } = renderHook(() => useWritingOpiton(MOCK_MIN_VOTE_OPTION));

    const { deleteOption } = result.current;

    act(() => {
      deleteOption(MOCK_MIN_VOTE_OPTION[0].id);
    });

    const { optionList } = result.current;

    expect(optionList).toBe(MOCK_MIN_VOTE_OPTION);
  });

  test('선택한 이미지가 있을 때 취소할 수 있다.', () => {
    const MOCK_IMAGE_OPTION = [
      { id: 12341, text: '', imageUrl: 'https' },
      { id: 123412, text: '', imageUrl: 'imageUrl' },
    ];

    const { result } = renderHook(() => useWritingOpiton(MOCK_IMAGE_OPTION));

    const { removeImage } = result.current;

    act(() => {
      removeImage(MOCK_MIN_VOTE_OPTION[0].id);
    });

    const { optionList } = result.current;

    expect(optionList[0].imageUrl).toBe('');
  });

  test('투표 선택지에 이미지 파일을 넣었을 때 URL로 변환할 수 있다.', () => {
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });

    const { result } = renderHook(() => useWritingOpiton(MOCK_MIN_VOTE_OPTION));

    const { uploadImage } = result.current;

    act(() => {
      uploadImage(MOCK_MIN_VOTE_OPTION[0].id, file);
    });

    const { optionList } = result.current;

    expect(optionList[0].imageUrl.length > 0).toBe(true);
  });
});
