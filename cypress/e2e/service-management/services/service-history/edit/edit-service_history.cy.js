import { Selectors, today, time } from "./selectors";
import { URLs } from "../../../../../constants/links";

describe("Test edit service history", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should edit service history", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.serviceHistory);
    cy.wait(3000);

    cy.get(Selectors.firstServiceHistoryInList).eq(0).click();
    cy.get(Selectors.editServiceHistory).eq(0).click();

    cy.wait(3000);
    cy.get(Selectors.closeNearestVendors).eq(2).click();

    cy.get(Selectors.input)
      .eq(5)
      .clear()
      .type(Math.floor(Math.random() * 20) * 50);

    cy.get(Selectors.paymentMethod).eq(7).click();
    cy.get(Selectors.option)
      .eq(Math.floor(Math.random() * 2))
      .click();

    // FILLING THE LABOR, PARTS, AND OTHER
    for (let o = 6; o < 8; o++) {
      cy.get(Selectors.input)
        .eq(o)
        .clear()
        .type(Math.floor(Math.random() * 10) * 20);
    }

    cy.get(Selectors.input)
      .eq(9)
      .clear()
      .type(Math.floor(Math.random() * 50));

    cy.get(Selectors.input)
      .eq(10)
      .clear()
      .type(Math.floor(Math.random() * 100) * 200);

    cy.get(Selectors.description)
      .clear()
      .type(`Was edited on ${today}, at ${time}`);

    cy.get(Selectors.saveButton).eq(1).click();
  });
});
