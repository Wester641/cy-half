import { Selectors, today, time } from "./selectors";
import { URLs } from "../../../../constants/links";

describe("Test edit vendor", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should edit vendor on production", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.vendorsPage);
    cy.wait(3000);

    cy.get(Selectors.firstVendor).eq(1).click();
    cy.get(Selectors.editVendor).click();
    cy.wait(3000);

    cy.get(Selectors.input)
      .eq(0)
      .type(`Vendor #${Math.floor(Math.random() * 100)}`);

    cy.get(Selectors.input)
      .eq(2)
      .clear()
      .type(`https://vendor${Math.floor(Math.random() * 100)}.com`);

    cy.get(Selectors.selectClick).eq(0).click();
    cy.get(Selectors.option)
      .eq(Math.floor(Math.random() * 4))
      .click();

    cy.get(Selectors.selectClick).eq(1).click();
    cy.contains("No options").then(() => {
      cy.get(Selectors.selectClick).eq(1).type("Dada");
      cy.get(Selectors.option)
        .eq(Math.floor(Math.random() * 4))
        .click();
    });

    cy.get(Selectors.selectClick).eq(2).click();
    cy.get(Selectors.option)
      .eq(Math.floor(Math.random() * 4))
      .click();

    cy.get(Selectors.input)
      .eq(13)
      .clear()
      .type(`This vendor was edited on ${today}, at ${time} by Zafar`);

    cy.get(Selectors.submitButton).click();
  });
});
