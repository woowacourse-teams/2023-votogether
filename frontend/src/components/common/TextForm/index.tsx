import { KeyboardEvent, useRef } from 'react';

import { convertTextTotStringLinkElement } from '@utils/post/convertTextTotStringLinkElement';

import * as S from './style';

/**
 * 참고자료
 * https://4sii.tistory.com/473 한글 2번 쳐지는 문제
 * https://velog.io/@o1_choi/isComposing isComposing이 어딨지?
 * https://developer.mozilla.org/en-US/docs/Web/API/Range/collapse 포커스가 앞으로 가는 문제 1
 * https://developer.mozilla.org/en-US/docs/Web/API/Selection/removeAllRanges 포커스가 앞으로 가는 문제 2
 * https://yung-developer.tistory.com/109 제일 많이 참고한 블로그
 *
 * @returns
 */
export default function TextForm() {
  const textRef = useRef<HTMLDivElement>(null);

  const focusContentEditableTextToEnd = (element: HTMLElement) => {
    if (element.innerText.length === 0) {
      element.focus();

      return;
    }

    const selection = window.getSelection();
    const newRange = document.createRange();

    newRange.selectNodeContents(element);
    newRange.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(newRange);
  };

  const handleKeyboardConvertHtml = (event: KeyboardEvent) => {
    if (event.nativeEvent.isComposing) return;

    if (!textRef.current) return;

    const contentText = convertTextTotStringLinkElement(textRef.current.innerText);

    if (event.code === 'Enter' || event.code === 'Space') {
      textRef.current.innerHTML = contentText;
      focusContentEditableTextToEnd(textRef.current);
    }
  };

  return <S.Container onKeyDown={handleKeyboardConvertHtml} ref={textRef} contentEditable="true" />;
}
