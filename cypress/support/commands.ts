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
      /** CDP로 네트워크 지연/속도 시뮬레이션 (Chrome/Chromium 전용) */
      emulateNetworkConditions(options: {
        offline?: boolean;
        latency?: number;
        downloadThroughput?: number;
        uploadThroughput?: number;
      }): Chainable<void>;
      orderAllCancel(): Chainable<void>;
      notificationCheck(notificationType: 'TRADE' | 'SYSTEM', notificationContent: string, count?: string): Chainable<void>;
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
  const email = 'test2@gmail.com';
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

/**
 * Chrome DevTools Protocol(CDP)로 네트워크 조건 시뮬레이션.
 * Chrome/Chromium 브라우저에서만 동작 (cypress run --browser chrome).
 */
Cypress.Commands.add(
  'emulateNetworkConditions',
  (options: {
    offline?: boolean;
    latency?: number;
    downloadThroughput?: number;
    uploadThroughput?: number;
  } = {}) => {
    const {
      offline = false,
      latency = 0,
      downloadThroughput = -1,
      uploadThroughput = -1,
    } = options;

    const promise = Cypress.automation('remote:debugger:protocol', {
      command: 'Network.emulateNetworkConditions',
      params: {
        offline,
        latency,
        downloadThroughput,
        uploadThroughput,
      },
    }) as Promise<void>;

    return cy.wrap(null, { log: false }).then(() => promise);
  }
);

Cypress.Commands.add('orderAllCancel', () => {
  cy.visit('/');
  cy.assertUrl('/');
  cy.findByText('거래내역').click();
  cy.get('label[for="unsettled"]').click()
  cy.get('[data-testid="unsettled"]').find('button').eq(0).click();
  cy.findByText('미체결 내역이 없습니다.').should('be.visible');
});

Cypress.Commands.add('notificationCheck',(notificationType: 'TRADE' | 'SYSTEM', notificationContent: string, count?: string) => {
  cy.visit('/');
  cy.assertUrl('/');
  cy.get('[data-testid="bell-icon"]').click();
  cy.get('[data-testid="notification-container"]').should('be.visible');
  cy.get('[data-testid="notification-container"]').within(() => {
    cy.findAllByText(notificationContent, { exact: false }).first().should('be.visible');
  });
  if(count) {
    cy.get('[data-testid="notification-container"]').within(() => {
      cy.findAllByText(count.toString(), { exact: false }).first().should('be.visible');
    });
  }
});