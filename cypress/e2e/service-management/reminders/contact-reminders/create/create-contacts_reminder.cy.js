import { Selectors, today, time } from "./selectors";
import { URLs } from "../../../../../constants/links";

describe("Test create contact-reminder", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should create contact-reminder on production", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.addContactReminders);
    cy.wait(3000);

    for (let i = 0; i < 2; i++) {
      cy.get(Selectors.selectClick).eq(i).click();
      cy.get(Selectors.option)
        .eq(Math.floor(Math.random() * 4))
        .click();
    }

    cy.get(Selectors.input).eq(1).type("1");

    cy.get(Selectors.selectClick).eq(2).click();
    cy.get(Selectors.option)
      .eq(Math.floor(Math.random() * 3))
      .click();

    cy.get(Selectors.description).type(
      `This contact-reminder was created on ${today}, at ${time} by Zafar`
    );

    cy.get(Selectors.submitButton).click();
  });
});
