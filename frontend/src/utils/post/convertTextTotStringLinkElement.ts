import { convertTextToUrl } from './convertTextToUrl';

export const convertTextTotStringLinkElement = (text: string) => {
  const convertedUrlText = convertTextToUrl(text);

  const linkPattern = /\[\[([^[\]]+)\]\]/g;

  const parts = convertedUrlText.split(linkPattern);

  const elementList = parts.map((part, index) => {
    if (index % 2 === 1) {
      // 링크

      return `<a>${part}</a>`;
    }

    return part;
  });

  return elementList.join('');
};
