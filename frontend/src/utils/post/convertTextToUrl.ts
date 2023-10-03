/**
 * https://abc.co.kr/@abc/4
 * https://votogether.com/
 * http://localhost:3000/posts/100035
 * http://votogether.com/
 * (?<!\[\[) 는 앞에 [[로 시작하는 지 여부를 확인한다
 * https?:\/\/는 http:// 혹은 https:// 로 시작하는 지 여부를 확인한다.
 * (?!\]\]) 는 뒤에 ]]로 끝나는 지 여부를 확인한다.
 * [^\s] 는 공백이 아닌 문자인지 여부를 확인한다.
 */
const httpsOrHttpRegex = /(?<!\[\[)(https?:\/\/[^\s]+)(?!\]\])/g;

/**
 * www.naver.com
 * www.tistory.com
 * (?<!\[\[) 는 앞에 [[로 시작하는 지 여부를 확인한다
 * (?<!\/)는 앞에 /로 시작하는 지 여부를 확인한다. https://www 에서 www 앞에 /가 있기에 중복되어 확인하는 것을 방지하기 위함
 * \b(w{3})\b 는 www로 시작하는 지 여부를 정확히 확인한다. w가 4개인 경우 판별하지 않음
 * [^\s] 는 공백이 아닌 문자인지 여부를 확인한다.
 * (?!\]\]) 는 뒤에 ]]로 끝나는 지 여부를 확인한다.
 */
const wwwRegex = /(?<!\[\[)(?<!\/)\b(w{3})\b[^\s]+(?!\]\])/g;

export const convertTextToUrl = (text: string) => {
  const httpOrHttpsConvertedText = text.replace(httpsOrHttpRegex, url => `[[${url}]]`);
  const wwwConvertedText = httpOrHttpsConvertedText.replace(wwwRegex, url => `[[${url}]]`);

  return wwwConvertedText;
};
