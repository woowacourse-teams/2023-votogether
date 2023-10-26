// linkRegex: https:// | http:// | www. 뒤에 문자+숫자+특수기호가 이어져있는 정규표현식
const linkRegex = /(?:https?:\/\/|w{3}\.)+[a-z0-9-+&@#/%?=~_|!:,.;]*[a-z0-9-+&@#/%=~_|]/g;
// [[ ]]를 표현하는 정규표현식
const customLinkPattern = /\[\[([^[\]]+)\]\]/g;

export const convertTextToUrl = (text: string) => {
  //아아[[링크]]다다 = [아아, 링크, 다다];
  const parts = text.split(customLinkPattern);

  return parts
    .map(part => {
      //linkRegex를 포함하지 않는다면 그대로 return
      if (!linkRegex.test(part)) return part;

      return part.replace(linkRegex, url => `[[${url}]]`);
    })
    .join('');
};
