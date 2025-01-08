/// <reference types="cypress" />
import { Selectors, today } from "./selectors";

describe("Checking 'assignement edit function'", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should find created assignement and edit it", () => {
    cy.loginWith(email, password);
    cy.url().should("include", "/units");
    cy.visit("/assignments");
    cy.wait(3000);

    cy.contains(Selectors.nameForSearch).should("be.visible").click();

    cy.get(Selectors.editIcon).eq(0).click();

    cy.get(Selectors.titleInput)
      .eq(0)
      .invoke("val", "2024-12-26")
      .trigger("input")
      .trigger("change");

    cy.get(Selectors.titleInput)
      .eq(3)
      .invoke("val", "2025-01-27")
      .trigger("input")
      .trigger("change");

    for (let i = 0; i < 2; i++) {
      cy.get(Selectors.selectClick).eq(i).click();
      cy.get(Selectors.selectOption)
        .eq(Math.floor(Math.random() * 6))
        .click();
    }

    cy.get(Selectors.titleDescription)
      .eq(0)
      .type(
        `Some description for editing assignement vehicles: Edited on ${today}`
      );
    cy.wait(3000);

    cy.get(Selectors.submitButton).click();
  });
});
