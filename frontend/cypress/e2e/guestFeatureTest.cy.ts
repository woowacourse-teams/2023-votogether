const visitUrl = 'http://localhost:3000/';

describe('guestFeatureTest', () => {
  it('visitSite', () => {
    cy.visit(visitUrl);
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('게시글 목록을 필터링/정렬 조건을 수정한다', function () {
    cy.visit('http://localhost:3000/');
    cy.get(':nth-child(1) > .sc-gVpkOZ > .sc-fXmShK').click();
    cy.get('.sc-gyMiQo > :nth-child(1)').click();
    cy.get(':nth-child(2) > .sc-gVpkOZ > .sc-fXmShK').click();
    cy.get('.sc-gyMiQo > :nth-child(1)').click();
    //list 확인 필요
  });

  it('랭킹 페이지에 진입해 인기글 상세 페이지로 이동한다', function () {
    cy.visit('http://localhost:3000/');
    cy.get('.sc-fWKGHs > .gHxHbZ > img').click();
    cy.get('.cbweqh').click();
    cy.get(':nth-child(1) > :nth-child(3) > a').click();
  });

  it('공지사항 목록페이지로 진입해 상세 공지사항 페이지로 이동한다', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000/');
    cy.get('.sc-hmrlCG > .sc-iJSKBe > .sc-giQjdv > span').click();
    //list 확인 필요
    cy.get(':nth-child(1) > .sc-fGwJSW > .sc-hmftdN').click();
  });

  it('게스트에게 보이는 토스트를 확인한다', function () {
    cy.visit('http://localhost:3000/');
    cy.get('.sc-fWKGHs > .sc-gSIKdN > .sc-iNyIUv > img').click();
    cy.get('.sc-bdDrbm').should('exist').should('contain', '로그인 후 이용');

    cy.get(
      '.sc-hmrlCG > .sc-iJSKBe > .sc-bYgGll > .sc-dILiZe > .sc-fKwBvW > .sc-dYlqv > .sc-hCcNSO > :nth-child(1) > .sc-fFCYnF > img'
    ).click();
    cy.get('.sc-bdDrbm').should('exist').should('contain', '로그인 후 이용');
  });

  it('스크롤버튼을 눌러 상단으로 이동한다', function () {
    cy.visit('http://localhost:3000/');
    cy.scrollTo('bottom');
    cy.scrollTo('bottom');
    cy.scrollTo('bottom');
    cy.get('.sc-eEFsNM').click();
    cy.get('html, body').should($el => {
      expect($el.scrollTop()).to.equal(0);
    });
  });

  it('a 키워드를 검색한다', function () {
    cy.visit('http://localhost:3000/');
    cy.get('.sc-jePPIV').click();
    cy.get('.sc-eIYifI').clear();
    cy.get('.sc-eIYifI').type('a');
    cy.get('.sc-otYyL > img').click();
    //list
  });
  /* ==== Test Created with Cypress Studio ==== */
});
