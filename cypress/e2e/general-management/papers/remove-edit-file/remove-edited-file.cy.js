/// <reference types="cypress" />

import { Selectors } from "./selectors";
import { URLs } from "../../../../constants/links";

describe("Test upload files", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should remove edited files", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);
    cy.visit(URLs.papers);
    cy.wait(3000);

    cy.get(Selectors.file)
      .eq(Math.floor(Math.random() * 8))
      .click();

    cy.get(Selectors.deleteIcon).eq(0).click();
    cy.get(Selectors.confirmDelete).eq(1).click().log("deleted");
    cy.wait(3000);
  });
});
