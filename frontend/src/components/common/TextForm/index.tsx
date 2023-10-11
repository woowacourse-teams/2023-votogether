import { KeyboardEvent, useRef } from 'react';

import { convertTextToUrl } from '@utils/post/convertTextToUrl';

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

  const convertTextToHtml = (text: string) => {
    const convertedUrlText = convertTextToUrl(text);

    const linkPattern = /(?<!<span)\[\[([^[\]]+)\]\]/g;

    const parts = convertedUrlText.split(linkPattern);

    const elementList = parts.map((part, index) => {
      if (index % 2 === 1) {
        // 링크

        return `<span style="text-decoration: underline; color: #004EC5;">${part}</span>`;
      }

      return part;
    });

    return elementList.join('');
  };

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
    if (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) return;

    if (!textRef.current) return;

    const removeEmptySpanText = textRef.current.innerHTML.replaceAll('<span></span>', '\n');
    const removeEmptyDivText = removeEmptySpanText.replaceAll('<div><br></div>', '\n');
    const contentText = removeEmptyDivText;

    if (event.code === 'Enter' || event.code === 'Space') {
      textRef.current.innerHTML = convertTextToHtml(contentText);
      focusContentEditableTextToEnd(textRef.current);
    }
  };

  return (
    <S.Container
      onKeyDown={handleKeyboardConvertHtml}
      ref={textRef}
      contentEditable="true"
    ></S.Container>
  );
}
