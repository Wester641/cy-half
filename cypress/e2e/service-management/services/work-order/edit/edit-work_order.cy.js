import { Selectors, today, time } from "./selectors";
import { URLs } from "../../../../../constants/links";

describe("Test edit work order", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should edit work order", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.workOrders);
    cy.wait(3000);
    cy.get(Selectors.firstWorkOrder).eq(0).click();
    cy.wait(3000);
    cy.get(Selectors.editWorkOrder).eq(3).click();
    cy.wait(3000);

    cy.get(Selectors.selectClick).eq(0).click();
    cy.get(Selectors.option)
      .eq(Math.floor(Math.random() * 10))
      .click();
    cy.wait(5000);

    cy.get(Selectors.closeNearestVendors).eq(0).click();

    cy.get(Selectors.input)
      .eq(10)
      .clear()
      .type(Math.floor(Math.random() * 30));

    cy.get(Selectors.input)
      .eq(11)
      .clear()
      .type(Math.floor(Math.random() * 100) * 200);

    cy.get(Selectors.description)
      .clear()
      .type(`Was edited on ${today}, at ${time} Kyrgyzstan Time.`);

    cy.get(Selectors.saveButton).eq(1).click();
    cy.wait(3000);
  });
});
