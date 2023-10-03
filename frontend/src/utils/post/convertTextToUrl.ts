/**
 * https://abc.co.kr/@abc/4
 * https://votogether.com/
 * http://localhost:3000/posts/100035
 * http://votogether.com/
 * ^reg는 뒤의 문자열로 시작하는지 여부를 확인한다.
 * /w 는 영문, 숫자, 언더바 문자에 매칭된다. [A-Za-z0-9_] 와 동일하다.
 */
const httpsOrHttpRegex = /^https?:\/\/[\w]/;

/**
 * www.naver.com
 * www.tistory.com
 * ^reg는 뒤의 문자열로 시작하는지 여부를 확인한다.
 * /w 는 영문, 숫자, 언더바 문자에 매칭된다. [A-Za-z0-9_] 와 동일하다.
 */
const wwwRegex = /^www\.[\w]/;

export const convertTextToUrl = (text: string) => {
  const wwwConvertedText = text.replaceAll(wwwRegex, `[[$]]`);
  const httpOrHttpsConvertedText = wwwConvertedText.replaceAll(httpsOrHttpRegex, `[[$]]`);

  return httpOrHttpsConvertedText;
};
