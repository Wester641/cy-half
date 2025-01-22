import { Selectors } from "./selectors";
import { URLs } from "../../../../constants/links";
describe("Test delete Inspection-form ", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });
  const loginAndRedirect = () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);
    cy.visit(URLs.inspectionForms);
  };

  it("should delete form", () => {
    loginAndRedirect();
    cy.wait(3000);

    // repeating 5 times
    Cypress._.times(1, () => {
      cy.contains("Example form").then((record) => {
        if (record) {
          cy.get(Selectors.threDotsMenu).eq(5).click();
          cy.get(Selectors.options).eq(3).click();
          cy.log("Archived!");
        }
      });
      cy.wait(1000);
    });
  });
});
