import { Selectors, today, time } from "./selectors";
import { URLs } from "../../../../../constants/links";

describe("Test create service task", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should add to service-task", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.serviceTaskCreate);
    cy.wait(3000);

    cy.get(Selectors.input)
      .eq(0)
      .type(Math.floor(Math.random() * 100) * 200 + ` Service Task`);

    cy.get(Selectors.description).type(
      `This service-task was created on ${today}, at ${time} by Zafar`
    );

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
