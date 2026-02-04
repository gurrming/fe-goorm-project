/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', () => {
  const email = 'test@example.com';
  const password = 'test1234';

  cy.visit('/login');

  cy.findByPlaceholderText('이메일을 입력해주세요.').type(email);
  cy.findByPlaceholderText('비밀번호를 입력해주세요.').type(password);
  cy.findByRole('button', { name: '로그인' }).click();

  // 로그인 처리 완료될때까지 기다림
  cy.findByText('test');
});

Cypress.Commands.add('logout', () => {
  cy.findByRole('button', { name: 'Maria' }).click();
  cy.findByRole('button', { name: '확인' }).click();
});

Cypress.Commands.add('assertUrl', url => {
  cy.url().should('eq', `${Cypress.env('baseUrl')}${url}`);
});

Cypress.Commands.add('getProductCardByIndex', index => {
  return cy.findAllByTestId('product-card').eq(index);
});

Cypress.Commands.addQuery('getCartButton', () => {
  const getFn = cy.now('get', `[data-testid="cart-icon"]`);

  return subject => {
    const btn = getFn(subject);

    return btn;
  };
});