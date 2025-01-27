import { Selectors, today, time } from "./selectors";
import { URLs } from "../../../../constants/links";

describe("Test create equipment", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should create equipment on production", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.addVendors);
    cy.wait(3000);

    cy.get(Selectors.input)
      .eq(0)
      .type(`Vendor #${Math.floor(Math.random() * 100)}`);
    cy.get(Selectors.input)
      .eq(1)
      .type(Math.floor(Math.random() * 1000) * 20000);

    cy.get(Selectors.input)
      .eq(2)
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
      .eq(10)
      .clear()
      .type(Math.floor(Math.random() * 100) * 10);

    cy.get(Selectors.input)
      .eq(11)
      .clear()
      .type(Math.floor(Math.random() * 20));

    cy.get(Selectors.input)
      .eq(13)
      .clear()
      .type(`This vendor was created on ${today}, at ${time} by Zafar`);

    cy.get(Selectors.input).eq(14).type(`Ahmed`);
    cy.get(Selectors.input).eq(15).type(`1 555 555-5555`);
    cy.get(Selectors.input)
      .eq(16)
      .type(`example${Math.floor(Math.random() * 1000)}@example.com`);

    cy.get(Selectors.inputRadio)
      .eq(4 + Math.floor(Math.random() * 8))
      .check();

    cy.get(Selectors.submitButton).click();
  });
});
