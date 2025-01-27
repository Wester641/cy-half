import { Selectors, today, time } from "./selectors";
import { URLs } from "../../../../../constants/links";

describe("Test create service history", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should add to service history", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.serviceHistory);
    cy.wait(3000);
    cy.get(Selectors.addServiceHistory).eq(0).click();

    // SELECT OPTIONS
    cy.get(Selectors.selectClick).eq(0).click();
    cy.get(Selectors.option)
      .eq(Math.floor(Math.random() * 10))
      .click();
    cy.wait(3000);
    cy.get(Selectors.closeNearestVendors).eq(2).click();

    cy.get(Selectors.input)
      .eq(0)
      .clear()
      .type(Math.floor(Math.random() * 100) * 200);

    // VOID CHECKBOX
    cy.get(Selectors.voidCheckbox).eq(0).check();

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

    // FILLING THE FORM
    for (let o = 6; o < 8; o++) {
      cy.get(Selectors.input)
        .eq(o)
        .clear()
        .type(Math.floor(Math.random() * 10) * 20);
    }

    cy.get(Selectors.input)
      .eq(5)
      .clear()
      .type(Math.floor(Math.random() * 20) * 50);

    cy.get(Selectors.input)
      .eq(9)
      .clear()
      .type(Math.floor(Math.random() * 50));

    cy.get(Selectors.input)
      .eq(10)
      .clear()
      .type(Math.floor(Math.random() * 100) * 200);

    cy.get(Selectors.description).type(
      `This service-history was created on ${today}, at ${time}`
    );

    cy.get(Selectors.saveButton).eq(1).click();
  });
});
