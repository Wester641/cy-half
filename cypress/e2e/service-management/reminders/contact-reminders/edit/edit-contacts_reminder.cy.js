import { Selectors, today, time } from "./selectors";
import { URLs } from "../../../../../constants/links";

describe("Test edit contact-reminder", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should edit contact-reminder on production", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.contactRemindersPage);
    // cy.wait(3000);

    cy.get(Selectors.firstServiceTaskInList).eq(1).click();
    cy.get(Selectors.editPencil).eq(12).click();

    for (let i = 0; i < 2; i++) {
      cy.get(Selectors.selectClick).eq(i).click();
      cy.get(Selectors.option)
        .eq(Math.floor(Math.random() * 4))
        .click();
    }

    cy.get(Selectors.input).eq(1).clear().type("1");

    cy.get(Selectors.selectClick).eq(2).click();
    cy.get(Selectors.option)
      .eq(Math.floor(Math.random() * 3))
      .click();

    cy.get(Selectors.description)
      .clear()
      .type(
        `This contact-reminder was edited on ${today}, at ${time} by Zafar`
      );

    cy.get(Selectors.submitButton).click();
  });
});
