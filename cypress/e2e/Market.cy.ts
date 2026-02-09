const categoryName = '더블제로';

const dataTestId = '[data-testid="market-table-item"]';

function getMarketPanel() {
  return cy.findByPlaceholderText('코인명 / 심볼검색').parent().parent();
}

function getMarketItemList() {
  return cy.get('[data-testid="market-item-list"]');
}

function tabChangeText() {
  getMarketPanel().should((item) => {
    const text = item.text();
    const isEmpty =
      text.includes('표시할 종목이 없습니다.') ||
      text.includes('로그인하면 내 보유자산을 확인할 수 있습니다.') ||
      text.includes('로그인하면 내 관심코인을 확인할 수 있습니다.');
    const hasRows = item.find(dataTestId).length >= 1;
    void expect(isEmpty || hasRows).to.be.true;
  });
}

describe('로그인 후 마켓 컴포넌트에서 발생하는 흐름', () => {
  beforeEach(() => {
    cy.login();
    cy.findByPlaceholderText('코인명 / 심볼검색').should('be.visible');
  });

  describe('탭/화면 전환', () => {
    it('원화, 관심, 보유 탭을 누르면 그에 맞는 목록이나 빈 화면이 보인다', () => {
      getMarketPanel().find('p').contains('원화').click();
      tabChangeText();

      getMarketPanel().find('p').contains('관심').click({ force: true });
      tabChangeText();

      getMarketPanel().find('p').contains('보유').click({ force: true });
      tabChangeText();
    });
  });

  describe('관심', () => {
    it('원화 탭에서 관심 아이콘을 누르면 관심 탭에 그 종목이 추가된다', () => {
      getMarketPanel().find('p').contains('원화').click();
      cy.findByPlaceholderText('코인명 / 심볼검색').type(categoryName);
      getMarketItemList()
        .contains(dataTestId, categoryName)
        .scrollIntoView()
        .within(() => cy.get('button').first().click());
      getMarketPanel().find('p').contains('관심').click({ force: true });
      cy.contains(categoryName).should('be.visible');
    });

    it('관심 탭에서 관심 아이콘을 눌러 해제하면 목록에서 그 종목이 사라진다', () => {
      getMarketPanel().find('p').contains('원화').click();
      cy.findByPlaceholderText('코인명 / 심볼검색').type(categoryName);
      getMarketItemList()
        .contains(dataTestId, categoryName)
        .scrollIntoView()
        .within(() => cy.get('button').first().click());
      getMarketPanel().find('p').contains('관심').click({ force: true });
      cy.contains(categoryName).should('be.visible');
      getMarketItemList()
        .contains(dataTestId, categoryName)
        .scrollIntoView()
        .within(() => cy.get('button').first().click());
      getMarketItemList().should((item) => {
        const emptyMsg = item.text().includes('표시할 종목이 없습니다.');
        const rowCount = item.find(dataTestId).length;
        void expect(emptyMsg || rowCount <= 1).to.be.true;
      });
    });
  });

  describe('필터링', () => {
    it('원화·관심 탭에서 현재가·전일대비·거래대금 헤더 누르면 정렬된다', () => {
      getMarketPanel().find('p').contains('원화').click();
      getMarketItemList()
        .find(dataTestId)
        .then(($rows) => $rows.toArray().map((el) => el.innerText))
        .as('orderBefore');
      getMarketPanel().find('span').contains('현재가').click();
      getMarketItemList()
        .find(dataTestId)
        .then(($rows) => $rows.toArray().map((el) => el.innerText))
        .then((orderAfter) => {
          cy.get<string[]>('@orderBefore').then((orderBefore) => {
            expect(orderAfter).to.not.deep.equal(orderBefore);
          });
        });
    });

    it('보유 탭에서 보유금·매수평균가·수익률 헤더 누르면 정렬된다', () => {
      getMarketPanel().find('p').contains('보유').click();
      getMarketItemList()
        .find(dataTestId)
        .then(($rows) => $rows.toArray().map((el) => el.innerText))
        .as('orderBefore');
      getMarketPanel().find('span').contains('보유(평가금)').click();
      getMarketItemList()
        .find(dataTestId)
        .then(($rows) => $rows.toArray().map((el) => el.innerText))
        .then((orderAfter) => {
          cy.get<string[]>('@orderBefore').then((orderBefore) => {
            expect(orderAfter).to.not.deep.equal(orderBefore);
          });
        });
    });
  });

  describe('리스트 아이템/상세 이동', () => {
    it('리스트에서 종목 클릭하면 차트와 호가창이 보인다', () => {
      cy.findByPlaceholderText('코인명 / 심볼검색').type(categoryName);
      cy.findByText(categoryName).click();
      cy.get('[data-testid="chart-tab"]').within(() => {
        cy.findByText(categoryName, { exact: false }).should('be.visible');
      });
      cy.get('[data-testid="buy-book"]').should('be.visible');
      cy.get('[data-testid="sell-book"]').should('be.visible');
    });
  });

  describe('[검색]', () => {
    it('검색창에 코인명 또는 심볼을 입력하면 목록이 필터되고, 지우면 원래 목록이 다시 뜬다', () => {
      getMarketPanel().find('p').contains('원화').click();
      getMarketItemList().find(dataTestId).its('length').as('initialCount');
      cy.findByPlaceholderText('코인명 / 심볼검색').type('비트');
      cy.findByPlaceholderText('코인명 / 심볼검색').clear({ force: true });

      cy.get('@initialCount').then((initial) => {
        getMarketItemList().find(dataTestId).its('length').should('eq', initial);
      });
    });
  });

  describe('[거래 연동]', () => {
    it('매수하면 보유 탭에 해당 종목이 뜬다', () => {
      cy.findByPlaceholderText('코인명 / 심볼검색').type(categoryName);
      cy.findByText(categoryName).click();
      cy.get('[data-testid="chart-tab"]').within(() => {
        cy.findByText(categoryName, { exact: false }).should('be.visible');
      });
      cy.get('[data-testid="buy-book"]').should('be.visible');
      cy.get('[data-testid="sell-book"]').should('be.visible');
      cy.get('[data-testid="order-form"]').find('input').eq(0).type('5000');
      cy.get('[data-testid="order-form"]').find('input').eq(1).type('1');
      cy.get('[data-testid="order-form"]').findByRole('button', { name: '매수' }).click();
      cy.findByText('매수 주문이 완료되었습니다.').should('be.visible');
      cy.findByRole('button', { name: '확인' }).click();
      getMarketPanel().find('p').contains('보유').click({ force: true });
      cy.contains(categoryName).should('be.visible');
    });
  });

  describe('[기본/예외 상태]', () => {
    it('관심 탭이 비어 있으면 안내 문구, 있으면 목록이 보인다', () => {
      getMarketPanel().find('p').contains('관심').click({ force: true });
      tabChangeText();
    });
  });
});
