import { Selectors, today } from "./selectors";
import { URLs } from "../../../../constants/links";

describe("Test create work order", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should add to work order", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.workOrders);
    cy.wait(3000);
    cy.get(Selectors.addWorkOrder).eq(0).click();
    cy.wait(3000);

    cy.get(Selectors.selectClick).eq(0).click();
    cy.get(Selectors.option)
      .eq(Math.floor(Math.random() * 10))
      .click();

    cy.get(Selectors.closeNearestVendors).eq(0).click();

    for (let j = 1; j < 8; j++) {
      cy.get(Selectors.selectClick).eq(j).click();
      cy.get(Selectors.option)
        .eq(Math.floor(Math.random() * 3))
        .click();
    }

    cy.get(Selectors.selectClick).eq(8).click();
    cy.get(Selectors.optionServiceTask)
      .eq(Math.floor(Math.random() * 8))
      .click();

    for (let k = 7; k < 10; k++) {
      cy.get(Selectors.input)
        .eq(k)
        .clear()
        .type(Math.floor(Math.random() * 100) * 200);
    }

    cy.get(Selectors.description).type(
      `This work-order was created on ${today}`
    );

    cy.get(Selectors.input)
      .eq(10)
      .clear()
      .type(Math.floor(Math.random() * 30));

    cy.get(Selectors.input)
      .eq(11)
      .clear()
      .type(Math.floor(Math.random() * 100) * 200);

    cy.get(Selectors.saveButton).eq(1).click();
    cy.wait(3000);
  });
});
