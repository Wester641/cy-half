/// <reference types="cypress" />
import { URLs } from "../../../../constants/links";
import { Selectors, today } from "./selectors";

describe("Test upload files", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should edit name uploaded files", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);
    cy.visit(URLs.papers);
    cy.wait(3000);

    cy.get(Selectors.file)
      .eq(Math.floor(Math.random() * 8))
      .click();

    cy.get(Selectors.recordTitle).invoke("text").as("titleAlias");

    cy.get(Selectors.editButton).eq(2).click();

    cy.get("@titleAlias").then((title) => {
      cy.get(Selectors.input)
        .eq(0)
        .type(
          `${Math.floor(Math.random() * 1000)} Edited:on ${today} By Cypress_` +
            title
        );

      cy.log(title);
    });
    cy.get(Selectors.saveButton).click().log("edited");
    cy.wait(5000);
  });
});
