// <reference types="cypress" />
import { URLs } from "../../../../constants/links";
import { Selectors } from "./selectors";
describe("Delete created fuel-history record", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should delete created fuel-history record", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);
    cy.visit(URLs.fuelHistory);
    cy.wait(3000);

    cy.get(Selectors.menu).eq(10).should("be.visible").click();
    cy.get(Selectors.delete).eq(1).should("be.visible").click();
    cy.get(Selectors.confirmDelete).eq(1).should("be.visible").click();
  });
});
