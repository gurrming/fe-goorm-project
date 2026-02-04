describe('Login', () => {
  it('SI-07: 로그인 성공', () => {
    cy.login();
    cy.assertUrl('/');
    cy.findByText('test님, 환영합니다.');
  });
  it('SI-10: 여러명이 같은 계정 로그인 시도', () => {
    cy.login();
    cy.assertUrl('/');
    
    cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/api/member/login`,
        body: {
            email: 'test@gmail.com',
            password: 'test1234',
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
    });
  });
  it('SI-11: 동시에 같은 계정 로그인 시도', () => {
    const loginUrl = `${Cypress.env('apiUrl')}/api/member/login`;
    const body = {
      email: 'test@gmail.com',
      password: 'test1234',
    };
    
    cy.wrap(null).then(async () => {
      const req1 = fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const req2 = fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const responses = await Promise.all([req1, req2]);

      const statusCodes = responses.map((response) => response.status);
      expect(statusCodes).to.deep.equal([200, 200]);
    })
  });
});

describe('Signup', () => {
  it('SU-12: 동시에 같은 이메일로 회원가입 시도', () => {
    let number = 4;
  
    const signupUrl = `${Cypress.env('apiUrl')}/api/member/signup`;
    const body = {
      email: `test${number}@gmail.com`,
      password: 'test1234',
      nickname: `test${number}`,
    };
    
    cy.wrap(null).then(async () => {
      const req1 = fetch(signupUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const req2 = fetch(signupUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const responses = await Promise.all([req1, req2]);

      const statusCodes = responses.map((response) => response.status);
      statusCodes.sort((a, b) => a - b);
      console.log('statusCodes', statusCodes);
      expect(statusCodes).to.deep.equal([200, 403]);
    })

    number++;
  });

});