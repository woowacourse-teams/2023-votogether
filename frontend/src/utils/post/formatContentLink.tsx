import React from 'react';

export const linkifyText = (text: string) => {
  const linkPattern = /\[\[([^[\]]+)\]\]/g;

  const parts = text.split(linkPattern);
  window.console.log(parts);

  const result = parts.map((part, index) => {
    if (index % 2 === 1) {
      // 링크
      const linkText = part;
      const linkUrl = linkText.startsWith('http' || 'https') ? linkText : `https://${linkText}`;
      return (
        <a
          key={index}
          href={linkUrl}
          target="_blank"
          style={{ textDecoration: 'underline', color: '#004EC5' }}
          rel="noreferrer noopener"
        >
          {linkText}
        </a>
      );
    } else {
      // 링크가 아닌 문자열
      return <span>{part}</span>;
    }
  });

  window.console.log(renderArrayWithStringsAndElements(result));

  return renderArrayWithStringsAndElements(result);
};

function renderArrayWithStringsAndElements(arr: any[]) {
  const renderedArray = arr.map((item, index) => {
    if (typeof item === 'string') {
      return item;
    } else {
      return React.cloneElement(item, { key: index });
    }
  });

  return <>{renderedArray}</>;
}
