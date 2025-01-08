import { URLs } from "../../../../constants/links";
import { Selectors, today } from "./selectors";
describe("Test Meter History's create funtion", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should visit to meter-history page, and create manually meter history and check a void checkbox", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);
    cy.visit(URLs.meterHistory);

    cy.get(Selectors.addButton).should(Selectors.visible).click();
    cy.get(Selectors.selectClick).should(Selectors.visible).click();
    cy.log("waiting for downloading data from API");
    cy.wait(5000);
    cy.get(Selectors.selectOption)
      .eq(Math.floor(Math.random() * 4))
      .click();
    cy.get(Selectors.input)
      .eq(0)
      .should(Selectors.visible)
      .type(`300${Math.floor(Math.random() * 1000)}`);
    cy.get(Selectors.voidCheckbox).check();
    cy.get(Selectors.submitButton).click();
  });
});
