describe('매수 테스트', () => {
    const COIN_NAME = '솔라나';
    const BUY_PRICE = '158,600';
    const BUY_COUNT = '0.1';
    const BUY_TOTAL_AMOUNT = Number(BUY_PRICE.replace(/[^0-9.-]+/g, "")) * Number(BUY_COUNT);
    beforeEach(()=>{
        cy.login();
        cy.assertUrl('/');
    })
    it('코인 매수 및 자산 반영 확인', () => {
        let initialAssetCash = 0;
        let initialCoinCount = 0;
        cy.visit('/asset');
        cy.assertUrl('/asset');
        cy.get('[data-testid="asset-cash"]',{timeout: 10000})
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                initialAssetCash = Number(text.replace(/[^0-9.-]+/g, ""));
                cy.log(`initialAssetCash: ${initialAssetCash}`);
            });
        cy.get('[data-testid="asset-list"]').then(($list) => {
            if ($list.text().includes(COIN_NAME)) {
                cy.contains('tr', COIN_NAME)
                    .within(() => {
                    cy.get('td')
                        .eq(1) 
                        .invoke('text')
                        .then((text) => {
                          initialCoinCount = Number(text.replace(/[^0-9.-]+/g, ""));
                          cy.log(`initialCoinCount: ${initialCoinCount}`);
                        });
                });
            }
        });
        cy.visit('/');
        
        cy.findByPlaceholderText('코인명 / 심볼검색').type(COIN_NAME);
        cy.findByText(COIN_NAME).click();

        cy.get('[data-testid="sell-book"]').should('be.visible');
        
        cy.get('body').then(($body) => {
            const sellBook = $body.find('[data-testid="sell-book"]');
            const hasSellOrder = sellBook.text().includes(BUY_PRICE);
               
        cy.get('[data-testid="order-form"]').find('input').eq(0).type(BUY_PRICE);
        cy.get('[data-testid="order-form"]').find('input').eq(1).type(BUY_COUNT);
        
        cy.findByRole('button', { name: '매수' }).click();
        cy.findByText('매수 주문이 완료되었습니다.').should('be.visible');
        cy.findByRole('button', { name: '확인' }).click();
        cy.findByText('거래내역').click();

        if(hasSellOrder) {
            cy.get('label[for="settled"]').click()
            cy.findAllByText(BUY_PRICE).should('be.visible');

            cy.visit('/asset');
            cy.assertUrl('/asset');

            cy.get('[data-testid="asset-cash"]',{timeout: 10000})
                .should('be.visible')
                .then(($el)=>{
                    const actualText = $el.text();
                    const actualCash = Number(actualText.replace(/[^0-9.-]+/g, ""));
                    const expectedCash = Number(initialAssetCash) - BUY_TOTAL_AMOUNT;
                    expect(actualCash).to.equal(expectedCash);
                    console.log('actualCash', actualCash);
                });
                cy.get('[data-testid="asset-list"]').findByText(COIN_NAME);
                // cy.findByText(Number(initialCoinCount) + Number(BUY_COUNT)).should('be.visible');
                cy.contains('tr', COIN_NAME)
                    .find('td')
                    .eq(1)
                    .invoke('text')
                    .then((displayedCount) => {
                        const actualCoinCount = initialCoinCount + parseFloat(BUY_COUNT);
                        const parsedDisplayed = parseFloat(displayedCount.replace(/[^0-9.-]+/g, ''));
                        expect(parsedDisplayed).to.be.closeTo(actualCoinCount, 0.0001);
                    });

            } else {
                cy.get('label[for="unsettled"]').click()
                cy.findAllByText(BUY_PRICE).should('be.visible');
                cy.orderAllCancel();
            }
        });
    });

});