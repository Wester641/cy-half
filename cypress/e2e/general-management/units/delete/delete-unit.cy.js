import { Selectors } from "./Selectors";
import { URLs } from "../../../../constants/links";

describe("Test delete function", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should delete unit", () => {
    cy.loginWith(email, password);

    cy.url().should("include", URLs.units);

    cy.wait(2000);

    cy.contains("TTruck")
      .should(Selectors.beVisible)
      .then((truck) => {
        if (truck) {
          cy.intercept("DELETE", URLs.api.deleteUnit).as("deleteUnitRequest");

          cy.get(Selectors.threeDotsMenu).eq(9).click();
          cy.contains(Selectors.delete).click();
          cy.contains(Selectors.delete).click();

          cy.wait("@deleteUnitRequest").then((interception) => {
            expect([200, 201, 204]).to.include(
              interception.response.statusCode
            );
          });
        }
      });
  });
});
