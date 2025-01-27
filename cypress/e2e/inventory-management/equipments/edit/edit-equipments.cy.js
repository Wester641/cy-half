import { Selectors, today, time } from "./selectors";
import { URLs } from "../../../../constants/links";

describe("Test create equipment", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should create equipment on production", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.equipmentsPage);
    cy.wait(3000);

    cy.get(Selectors.firstEquipment).eq(1).click();
    cy.get(Selectors.editEquipment).eq(0).click();

    for (let i = 0; i < 2; i++) {
      cy.get(Selectors.selectClick).eq(i).click();
      cy.get(Selectors.option)
        .eq(Math.floor(Math.random() * 4))
        .click();
    }

    cy.get(Selectors.input)
      .eq(0)
      .clear()
      .type(`EDT Equipment #${Math.floor(Math.random() * 100)}`);
    cy.get(Selectors.description)
      .clear()
      .type(`Equipment was edited on ${today}, at ${time} by Zafar`);
    cy.get(Selectors.input).eq(1).clear().type("TTLD");
    cy.get(Selectors.input).eq(2).clear().type("ELD");
    cy.get(Selectors.input)
      .eq(3)
      .clear()
      .type(Math.floor(Math.random() * 1000) * 2000);

    cy.get(Selectors.submitButton).click();
  });
});
