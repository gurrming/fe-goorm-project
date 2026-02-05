describe('매도 테스트', () => {
    const COIN_NAME = '솔라나';
    const SELL_PRICE = '153,100';
    const SELL_COUNT = '0.1';
    const SELL_TOTAL_AMOUNT = Number(SELL_PRICE.replace(/[^0-9.-]+/g, "")) * Number(SELL_COUNT);
    console.log('SELL_TOTAL_AMOUNT', SELL_TOTAL_AMOUNT);

    beforeEach(()=>{
        cy.login();
        cy.assertUrl('/');
    })
    
    it('코인 매도 및 자산 반영 확인', () => {
        let initialAssetCash = 0;
        let initialCoinCount = 0.0;

        cy.intercept('GET', `${Cypress.env('apiUrl')}/api/assets/${Cypress.env('memberId')}`).as('getAssets');

        cy.visit('/asset');
        cy.wait('@getAssets');
        cy.assertUrl('/asset');

        cy.get('[data-testid="asset-cash"]',{timeout: 10000})
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                initialAssetCash = Number(text.replace(/[^0-9.-]+/g, ""));
                cy.log(`initialAssetCash: ${initialAssetCash}`);
            });
        cy.get('[data-testid="asset-list"]',{timeout: 10000}).then(($list) => {
            if ($list.text().includes(COIN_NAME)) {
                cy.contains('tr', COIN_NAME)
                    .within(() => {
                    cy.get('td')
                        .eq(1) 
                        .invoke('text')
                        .then((text) => {
                          initialCoinCount = parseFloat(text.replace(/[^0-9.-]+/g, ""));
                          cy.log(`initialCoinCount: ${initialCoinCount}`);
                        });
                });
            }
        });
        cy.visit('/');
        
        cy.findByPlaceholderText('코인명 / 심볼검색').type(COIN_NAME);
        cy.findByText(COIN_NAME).click();
        cy.findByText('매도').click();


        cy.get('body').then(($body) => {
            const buyBook = $body.find('[data-testid="buy-book"]');
            const hasBuyOrder = buyBook.text().includes(SELL_PRICE);
            
            cy.get('[data-testid="order-form"]').find('input').eq(0).type(SELL_PRICE);
            cy.get('[data-testid="order-form"]').find('input').eq(1).type(SELL_COUNT);

            
            cy.findByRole('button', { name: '매도' }).click();

            cy.findByText('매도 주문이 완료되었습니다.').should('be.visible');
            cy.findByRole('button', { name: '확인' }).click();
            cy.findByText('거래내역').click();

            if(hasBuyOrder) {
                cy.get('label[for="settled"]').click()
                // cy.findAllByText(SELL_PRICE).should('be.visible');
                cy.get('[data-testid="settled"] tbody').find('tr').eq(0).findByText(SELL_PRICE).should('be.visible');
    
                cy.visit('/asset');
                cy.assertUrl('/asset');
    
                cy.get('[data-testid="asset-cash"]',{timeout: 10000})
                    .should('be.visible')
                    .then(($el)=>{
                        const actualText = $el.text();
                        const actualCash = Number(actualText.replace(/[^0-9.-]+/g, ""));
                        console.log('actualCash', actualCash);
                        const expectedCash = Number(initialAssetCash) + SELL_TOTAL_AMOUNT;
                        expect(actualCash).to.equal(expectedCash);
                    });
                cy.contains('tr', COIN_NAME)
                    .find('td')
                    .eq(1)
                    .invoke('text')
                    .then((displayedCount) => {
                        const actualCoinCount = initialCoinCount - parseFloat(SELL_COUNT);
                        const parsedDisplayed = parseFloat(displayedCount.replace(/[^0-9.-]+/g, ''));
                        expect(parsedDisplayed).to.be.closeTo(actualCoinCount, 0.0001);
                    });

                cy.notificationCheck('TRADE', `[${COIN_NAME}] 매도 체결 완료!`, SELL_COUNT);
            } else {
                cy.get('label[for="unsettled"]').click()
                cy.findAllByText(SELL_PRICE).should('be.visible');
                cy.orderAllCancel();
            }
        });
    });
});