describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('app is running!');
  });
});

describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visits the initial app page', () => {
    cy.contains('JUG Tours');
    cy.contains('Logout');
  });
});
