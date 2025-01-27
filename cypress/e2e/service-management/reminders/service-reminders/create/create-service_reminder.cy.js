import { Selectors } from "./selectors";
import { URLs } from "../../../../../constants/links";

describe("Test create service-reminder", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should create service-reminder on production", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.addServiceReminders);
    cy.wait(3000);

    for (let i = 0; i < 2; i++) {
      cy.get(Selectors.selectClick).eq(i).click();
      cy.get(Selectors.option)
        .eq(Math.floor(Math.random() * 6))
        .click();
    }
    cy.get(Selectors.selectClick).eq(2).click();
    cy.get(Selectors.option)
      .eq(Math.floor(Math.random() * 3))
      .click();

    cy.get(Selectors.selectClick).eq(3).click();
    cy.get(Selectors.option).eq(0).click();
    for (let k = 0; k < 2; k++) {
      cy.get(Selectors.input).eq(k).type("1");
    }

    cy.get(Selectors.input).eq(2).type("20000");
    cy.get(Selectors.input).eq(3).type("1000");
    cy.get(Selectors.submitButton).click();
  });
});
