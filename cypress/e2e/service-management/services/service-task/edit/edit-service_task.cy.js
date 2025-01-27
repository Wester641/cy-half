import { Selectors, today, time } from "./selectors";
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
    cy.get(Selectors.editPencil).eq(1).click();

    cy.get(Selectors.input)
      .eq(0)
      .clear()
      .type(Math.floor(Math.random() * 100) * 200 + ` EDT Service Task`);

    cy.get(Selectors.description)
      .clear()
      .type(`This service-task was edited on ${today}, at ${time} by Zafar`);

    for (let i = 0; i < 2; i++) {
      cy.get(Selectors.selectClick).eq(i).click();
      cy.get(Selectors.option)
        .eq(Math.floor(Math.random() * 3))
        .click();
    }
    cy.get(Selectors.selectClick).eq(3).click();
    cy.get(Selectors.option)
      .eq(Math.floor(Math.random() * 5))
      .click();
    cy.wait(3000);

    cy.get(Selectors.saveButton).eq(0).click();
  });
});
