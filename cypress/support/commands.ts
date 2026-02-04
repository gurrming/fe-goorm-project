/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
import '@testing-library/cypress/add-commands';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      signup(email: string, password: string, nickname: string): Chainable<void>;
      login(): Chainable<void>;
      logout(): Chainable<void>;
      assertUrl(url: string): Chainable<void>;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

Cypress.Commands.add('signup', (email: string, password: string, nickname: string) => {
  cy.visit('/signup');
  cy.findByPlaceholderText('이메일을 입력해주세요.').type(email);

  cy.findByRole('button', { name: '중복 확인' }).click();
  cy.findByText('사용 가능한 이메일입니다.').should('be.visible');
  
  cy.findByPlaceholderText('비밀번호를 입력해주세요.').type(password);
  cy.findByPlaceholderText('비밀번호를 다시 입력해주세요.').type(password);
  cy.findByPlaceholderText('닉네임을 입력해주세요.').type(nickname);
  cy.get('form').findByRole('button', { name: '회원가입' }).click();
});

Cypress.Commands.add('login', () => {
  const email = 'test@gmail.com';
  const password = 'test1234';

  cy.visit('/login');

  cy.findByPlaceholderText('이메일을 입력해주세요.').type(email);
  cy.findByPlaceholderText('비밀번호를 입력해주세요.').type(password);
  cy.get('form').findByRole('button', { name: '로그인' }).click();
});

Cypress.Commands.add('logout', () => {
  cy.findByRole('button', { name: '로그아웃' }).click();
});

Cypress.Commands.add('assertUrl', url => {
  cy.url().should('eq', `${Cypress.env('baseUrl')}${url}`);
});