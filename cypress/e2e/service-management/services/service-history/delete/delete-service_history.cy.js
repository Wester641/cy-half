import { Selectors, today } from "./selectors";
import { URLs } from "../../../../../constants/links";

describe("Test delete service history", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should delete service history", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.serviceHistory);
    cy.log("If you want to play this test, remove comment codes in this file.");
    cy.wait(3000);
    // cy.get(Selectors.threeDotsMenu).eq(1).click();
    // cy.get(Selectors.deleteButton).eq(0).click();
    // cy.contains(Selectors.confirmDelete).click();
  });
});
