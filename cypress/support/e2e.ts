// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// When a command from ./commands is ready to use, import with `import './commands'` syntax
// import './commands';

import './commands';

beforeEach(() => {
  if (Cypress.env('E2E_USERNAME') === undefined) {
    console.error('E2E_USERNAME is not defined');
    alert('E2E_USERNAME is not defined');
    return;
  }
  cy.visit('/');
  cy.get('#login').click();
  cy.login(Cypress.env('E2E_USERNAME'), Cypress.env('E2E_PASSWORD'));
});

afterEach(() => {
  cy.visit('/');
  cy.get('#logout').click();
});
