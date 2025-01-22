import { URLs } from "../../../../constants/links";
import { Selectors, today } from "./selectors";

describe("Test create Inspection-form", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit(URLs.login);
  });

  const loginAndRedirect = () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);
    cy.visit(URLs.inspectionForms);
  };

  it("should fill all fields and create inspection-form", () => {
    loginAndRedirect();
    cy.wait(3000);
    cy.get(Selectors.loginButton).eq(0).click();
    cy.get(Selectors.titleInput)
      .eq(0)
      .type(`Example form #${Math.floor(Math.random() * 100)} `)
      .log("Title");
    cy.get(Selectors.titleDescription).eq(0).type(`Created on ${today}`);
    cy.get(Selectors.modalHeader).eq(0).click();

    cy.get(Selectors.checkbox).eq(0).check({ force: true });
    cy.get(Selectors.checkbox).eq(1).check({ force: true });

    cy.get(Selectors.modalItem)
      .eq(Math.floor(Math.random() * 6))
      .click();

    cy.wait(3000);
    cy.get(Selectors.continueButton).eq(0).click().log("Continue");
    cy.wait(3000);

    // Filling the form
    cy.get(Selectors.item).eq(0).click().log("Date-item");
    cy.get(Selectors.titleInput).eq(0).type(`Date of form #1`);
    cy.get(Selectors.titleInput).eq(1).type(`Date short description #1`);
    cy.get(Selectors.item).eq(1).click();
    cy.get(Selectors.titleInput).eq(2).type(`Dropdown title #2`);

    cy.get(Selectors.titleInput).eq(3).type(`Short description of dropdown #2`);
    cy.get(Selectors.titleInput).eq(4).type(`Chosen summary dropdown #2`);
    cy.get(Selectors.item).eq(2).click().log("Free-text-item");
    cy.get(Selectors.titleInput).eq(5).type(`Free text title #3`);
    cy.get(Selectors.titleInput).eq(6).type(`Free text short description #3`);
    cy.get(Selectors.item).eq(3).click().log("Meter-history-item");
    cy.get(Selectors.titleInput).eq(7).type(`Meter history title #4`);
    cy.get(Selectors.titleInput)
      .eq(8)
      .type(`Meter history short description #4`);

    cy.get(Selectors.item).eq(4).click().log("Number-item");
    cy.get(Selectors.titleInput).eq(9).type(`Number title #5`);
    cy.get(Selectors.titleInput).eq(10).type(`Number short description #5`);
    cy.get(Selectors.titleInput).eq(11).type(`5`);
    cy.get(Selectors.titleInput).eq(12).type(`20`);

    cy.get(Selectors.item).eq(5).click().log("Pass-Fail-item");
    cy.get(Selectors.titleInput).eq(13).type(`Pass-Fail title #5`);
    cy.get(Selectors.titleInput).eq(14).type(`Pass-Fail short description #5`);
    cy.get(Selectors.titleInput).eq(15).type(`Pass`);
    cy.get(Selectors.titleInput).eq(16).type(`Fail`);

    cy.get(Selectors.item).eq(6).click().log("Photo-item");
    cy.get(Selectors.titleInput).eq(17).type(`Photo title #6`);
    cy.get(Selectors.titleInput).eq(18).type(`Photo short description #6`);

    cy.get(Selectors.item).eq(7).click().log("Photo-summary-item");

    cy.get(Selectors.titleInput).eq(19).type(`Photo summary title #7`);
    cy.get(Selectors.titleInput)
      .eq(20)
      .type(`Photo summary short description #7`);

    cy.get(Selectors.item).eq(8).click().log("Section-item");

    cy.get(Selectors.titleInput).eq(21).type(`Section title #8`);

    cy.get(Selectors.continueButton).click();
    cy.wait(3000);
  });
});
