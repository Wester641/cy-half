import { URLs } from "../../../../constants/links";
import { Selectors } from "./Selectors";

describe("Test edit function", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");
  beforeEach(() => {
    cy.visit("/");
  });
  it("should edit user", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.users);
    cy.get(Selectors.firstUser).eq(2).click();
    cy.wait(2000);
    cy.contains(Selectors.editButton, "Edit").click();
    cy.wait(2000);

    cy.url().should("include", URLs.userEditPage);
    cy.intercept("PATCH", URLs.api.updateUser).as("UpdateUser");
    cy.intercept("GET", URLs.api.getUser).as("UserDetails");
    cy.get(Selectors.input)
      .eq(0)
      .clear()
      .type(`edited${Math.floor(Math.random() * 1000)}`);

    cy.get(Selectors.input)
      .eq(3)
      .clear()
      .type(`edited${Math.floor(Math.random() * 1000)}@example.com`);
    cy.get(Selectors.groupOption).eq(1).click();
    cy.get(Selectors.selectGroupOption)
      .eq(Math.floor(Math.random() * 3))
      .click();
    cy.get(Selectors.submitButton).click();
    cy.wait(2000);
    cy.visit(URLs.users);
  });
});
