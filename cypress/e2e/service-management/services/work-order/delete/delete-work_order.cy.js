import { Selectors } from "./selectors";
import { URLs } from "../../../../../constants/links";

describe("Test delete work order", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should delete work order", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.workOrders);
    cy.wait(3000);
    cy.get(Selectors.firstWorkOrder).eq(0).click();
    cy.log("If you want to play this test, remove comment codes in this file.");
    cy.wait(3000);
    // cy.get(Selectors.deleteWorkOrder).eq(2).click();
    // cy.get(Selectors.deleteConfirm).eq(3).click();
    cy.wait(3000);
  });
});
