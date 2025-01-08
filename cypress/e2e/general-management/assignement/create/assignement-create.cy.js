/// <reference types="cypress" />
import { Selectors, today } from "./selectors";

describe("Checking 'assignement create function'", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should fill all fields and create assignement", () => {
    cy.loginWith(email, password);
    cy.url().should("include", "/units");
    cy.visit("/assignments");
    cy.wait(3000);

    cy.get(Selectors.addButton).click();

    for (let i = 0; i < 2; i++) {
      cy.get(Selectors.selectClick).eq(i).click();
      cy.get(Selectors.selectOption)
        .eq(Math.floor(Math.random() * 6))
        .click();
    }

    cy.get(Selectors.titleInput)
      .eq(0)
      .invoke("val", "2024-12-24")
      .trigger("input")
      .trigger("change");

    cy.get(Selectors.titleInput)
      .eq(2)
      .invoke("val")
      .then((value) => {
        if (!value) {
          cy.get(Selectors.titleInput)
            .eq(2)
            .type(Math.floor(Math.random() * 50) * 300)
            .blur();
        }
      });

    cy.get(Selectors.titleInput)
      .eq(3)
      .invoke("val", "2024-12-27")
      .trigger("input")
      .trigger("change");

    cy.get(Selectors.titleDescription)
      .eq(0)
      .type(`Some description for assignement vehicle: Created on ${today}`);
    cy.wait(3000);

    cy.get(Selectors.submitButton).click();
  });
});
