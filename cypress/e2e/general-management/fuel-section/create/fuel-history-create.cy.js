import { Selectors, today } from "./selectors";
import { URLs } from "../../../../constants/links";

describe("Login and create fuel-history", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should fill all fields and create fuel-history", () => {
    cy.loginWith(email, password);
    cy.url().should("include", "/units");
    cy.visit("/fuel-history");
    cy.wait(3000);
    cy.visit("/fuel-history/create");
    cy.wait(3000);

    cy.intercept("POST", URLs.api.createFuelHistory).as("createFuel");

    for (let i = 0; i < 2; i++) {
      cy.get(Selectors.selectClick).eq(i).click();
      cy.get(Selectors.selectOption)
        .eq(Math.floor(Math.random() * 5))
        .click();
    }
    cy.get(Selectors.input)
      .eq(2)
      .type(Math.floor(Math.random() * 100) * 200);

    cy.get(Selectors.input)
      .eq(3)
      .type(Math.floor(Math.random() * 100) * 2000);

    cy.get(Selectors.input)
      .eq(4)
      .then(() => {
        const gallons = Math.floor(Math.random() * 300);
        cy.get(Selectors.input).eq(4).type(gallons);
        if (gallons) {
          cy.get(Selectors.titleDescription)
            .eq(0)
            .type(
              gallons + ` gallons were refueled. Record created on ${today}`
            );
        }
      });

    cy.get(Selectors.input).eq(5).type(5);
    cy.get(Selectors.input).eq(6).type("GAS");
    cy.get(Selectors.radioCheck)
      .eq(Math.floor(Math.random() * 2))
      .click();

    cy.get(Selectors.submitButton).click();

    cy.wait("@createFuel").then(({ response }) => {
      expect([200, 201, 204]).to.include(response?.statusCode);
    });
    cy.get(Selectors.firstFuelHistoryRecord).eq(20).click();
    cy.wait(3000);
  });
});
