Cypress.Commands.add("write", (identifier, data) => {
  cy.get(identifier).type(data);
});
Cypress.Commands.add("buttonClick", (identifier) => {
  cy.get(identifier).click();
});
Cypress.Commands.add("loginWith", (email, password) => {
  cy.get('input[type="text"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
});
Cypress.Commands.add("clearClickAndApply", () => {
  cy.get('svg[data-testid="ClearIcon"]').should("be.visible").click();
  cy.contains("button[type='button']", "Apply").should("be.visible").click();
});
Cypress.Commands.add("loginEnter", (email, password) => {
  cy.intercept("POST", "/api/v1/accounts/login/").as("loginRequest");
  cy.loginWith(email, password);
  cy.wait("@loginRequest", { timeout: 10000 }).then((interception) => {
    expect([200, 201, 204]).to.include(interception.response.statusCode);
  });
});
Cypress.Commands.add("success", (message) => {
  cy.contains(message, {
    timeout: 30000,
  }).should("be.visible");
});
Cypress.Commands.add("dragAndDrop", (dragSelector, dropSelector) => {
  cy.get(dragSelector)
    .trigger("mousedown", { which: 1, button: 0 })
    .trigger("mousemove", { clientX: 100, clientY: 100 })
    .get(dropSelector)
    .trigger("mousemove")
    .trigger("mouseup", { force: true });
});

Cypress.Commands.add("GET", (requestLink, responseName) => {
  cy.intercept("GET", requestLink).as(responseName);
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
