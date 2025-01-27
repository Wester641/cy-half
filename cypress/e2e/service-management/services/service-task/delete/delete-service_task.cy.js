import { Selectors } from "./selectors";
import { URLs } from "../../../../../constants/links";

describe("Test edit service task", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should edit service-task", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.serviceTask);
    cy.wait(3000);

    cy.get(Selectors.firstServiceTaskInList).eq(0).click();
    cy.get(Selectors.closeModal).eq(3).click();
  });
});
