const visitUrl = 'http://localhost:3000/';

describe('guestFeatureTest', () => {
  it('visitSite', () => {
    cy.visit(visitUrl);
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('controlPostListFilteringOrSorting', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000/');
    cy.get(':nth-child(1) > .sc-gVpkOZ > .sc-fXmShK').click();
    cy.get('.sc-gyMiQo > :nth-child(1)').click();
    cy.get(':nth-child(2) > .sc-gVpkOZ > .sc-fXmShK').click();
    cy.get('.sc-gyMiQo > :nth-child(1)').click();
    //list 확인 필요
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('lookRankingAndGoPopularPost', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000/');
    cy.get('.sc-fWKGHs > .gHxHbZ > img').click();
    cy.get('.cbweqh').click();
    cy.get(':nth-child(1) > :nth-child(3) > a').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('lookNoticeListAndNoticeDetail', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000/');
    cy.get('.sc-hmrlCG > .sc-iJSKBe > .sc-giQjdv > span').click();
    //list 확인 필요
    cy.get(':nth-child(1) > .sc-fGwJSW > .sc-hmftdN').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('showToastForGuest', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000/');
    cy.get('.sc-fWKGHs > .sc-gSIKdN > .sc-iNyIUv > img').click();
    cy.get('.sc-bdDrbm').should('exist').should('contain', '로그인 후 이용');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      '.sc-hmrlCG > .sc-iJSKBe > .sc-bYgGll > .sc-dILiZe > .sc-fKwBvW > .sc-dYlqv > .sc-hCcNSO > :nth-child(1) > .sc-fFCYnF > img'
    ).click();
    cy.get('.sc-bdDrbm').should('exist').should('contain', '로그인 후 이용');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('scrollTopScreen', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000/');
    cy.scrollTo('bottom');
    cy.scrollTo('bottom');
    cy.scrollTo('bottom');
    cy.get('.sc-eEFsNM').click();
    cy.get('html, body').should($el => {
      expect($el.scrollTop()).to.equal(0);
    });
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('searchAKeyword', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000/');
    cy.get('.sc-jePPIV').click();
    cy.get('.sc-eIYifI').clear();
    cy.get('.sc-eIYifI').type('a');
    cy.get('.sc-otYyL > img').click();
    //list
    /* ==== End Cypress Studio ==== */
  });
});
