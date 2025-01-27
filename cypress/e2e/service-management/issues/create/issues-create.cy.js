import { Selectors } from "./selectors";
import { URLs } from "../../../../constants/links";

describe("Test create issue", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  afterEach(() => {
    cy.visit(URLs.issues);
  });

  it("should create issue on production", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.issues);
    cy.url().should("include", URLs.issues);
    cy.wait(2500);
    cy.get(Selectors.addIssueButton).eq(1).should(Selectors.beVisible).click();
    cy.url().should("include", URLs.issueCreatePage);

    // FILLING THE FORM
    for (let i = 0; i < 5; i++) {
      cy.get(Selectors.selectClick).eq(i).click();
      cy.get(Selectors.option)
        .eq(Math.floor(Math.random() * 4))
        .click();
    }
    cy.intercept("POST", URLs.api.issuesCreateReq).as("createIssues");

    cy.get(Selectors.input)
      .eq(2)
      .type(`Tire pressure issue #${Math.floor(Math.random() * 1000)}`);

    cy.get(Selectors.textArea)
      .eq(0)
      .type(`Description#${Math.floor(Math.random() * 1000)}`);
    cy.get(Selectors.submitButton).click();
    cy.wait(2500);

    // ADD TO NEW ISSUE
    cy.get(Selectors.firstUnit).eq(0).click();
    cy.get(Selectors.changeStatusButton).click();

    // RESOLVE ISSUES FROM DETAIL INFORMATION
    cy.get(Selectors.resolveButton).eq(1).click();
    cy.get(Selectors.textArea)
      .eq(2)
      .type(`Resolve description#${Math.floor(Math.random() * 1000)}`);
    cy.get(Selectors.confirmButton).eq(1).click();

    cy.wait(3000);

    // REOPEN ISSUES
    cy.get(Selectors.changeStatusButton).click();
    cy.get(Selectors.confirmButton).eq(2).click();
    cy.wait(2500);
  });
});
