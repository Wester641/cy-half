import { Selectors } from "./selectors";
import { URLs } from "../../../../constants/links";

describe("Test create Inspection-form ", () => {
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

  it("should edit inspection-form", () => {
    loginAndRedirect();
    cy.wait(3000);
    cy.contains("Example form").then((element) => {
      cy.wait(3000);
      cy.get(Selectors.firstInspectionRecord).eq(0).click();
    });
    cy.wait(3000);
    cy.get(Selectors.editButton).eq(0).click().log("Edit");
    cy.wait(3000);

    cy.get(Selectors.titleInput)
      .eq(0)
      .clear()
      .type(`Date of form #1 EDT`)
      .log("First field");

    cy.get(Selectors.titleInput)
      .eq(1)
      .clear()
      .type(`Date short description #1 EDT`);

    cy.get(Selectors.titleInput).eq(2).clear().type(`Dropdown title #2 EDT`);
    cy.get(Selectors.titleInput)
      .eq(3)
      .clear()
      .type(`Short description of dropdown #2 EDT`);
    cy.get(Selectors.titleInput)
      .eq(4)
      .clear()
      .type(`Chosen summary dropdown #2 EDT`);

    cy.get(Selectors.titleInput).eq(5).clear().type(`Free text title #3 EDT`);
    cy.get(Selectors.titleInput)
      .eq(6)
      .clear()
      .type(`Free text short description #3 EDT`);

    cy.get(Selectors.titleInput)
      .eq(7)
      .clear()
      .type(`Meter history title #4 EDT`);
    cy.get(Selectors.titleInput)
      .eq(8)
      .clear()
      .type(`Meter history short description #4 EDT`);

    cy.get(Selectors.titleInput).eq(9).clear().type(`Number title #4 EDT`);
    cy.get(Selectors.titleInput)
      .eq(10)
      .clear()
      .type(`Number short description #4 EDT`);
    cy.get(Selectors.titleInput).eq(11).clear().type(`12`);
    cy.get(Selectors.titleInput).eq(12).clear().type(`15`);

    cy.get(Selectors.titleInput).eq(13).clear().type(`Pass-Fail title #4 EDT`);
    cy.get(Selectors.titleInput)
      .eq(14)
      .clear()
      .type(`Pass-Fail short description #4 EDT`);
    cy.get(Selectors.titleInput).eq(15).clear().type(`Fail`);
    cy.get(Selectors.titleInput).eq(16).clear().type(`Pass`);

    cy.get(Selectors.titleInput).eq(17).clear().type(`Photo title #4 EDT`);
    cy.get(Selectors.titleInput)
      .eq(18)
      .clear()
      .type(`Photo short description #4 EDT`);

    cy.get(Selectors.titleInput)
      .eq(19)
      .clear()
      .type(`Photo summary title #4 EDT`);
    cy.get(Selectors.titleInput)
      .eq(20)
      .clear()
      .type(`Photo summary short description #4 EDT`);
    cy.get(Selectors.titleInput).eq(21).clear().type(`Section title #4 EDT`);

    cy.get(Selectors.continueButton).click();
  });

});
