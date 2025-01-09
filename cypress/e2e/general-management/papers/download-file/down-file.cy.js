/// <reference types="cypress" />
import { URLs } from "../../../../constants/links";
import { Selectors } from "./selectors";

describe("Test download file", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should download file", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);
    cy.visit(URLs.papers);
    cy.wait(3000);

    cy.get(Selectors.file)
      .eq(Math.floor(Math.random() * 8))
      .click();

    cy.get(Selectors.download).eq(1).click().log("downloaded");
    cy.wait(3000);
  });
});
