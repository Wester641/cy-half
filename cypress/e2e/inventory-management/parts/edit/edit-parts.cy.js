import { Selectors, today, time } from "./selectors";
import { URLs } from "../../../../constants/links";

describe("Test edit parts", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should edit parts on production", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    // cy.visit(URLs.partsPage);
    // cy.wait(3000);

    cy.get(Selectors.sideBar).eq(2).click();
    cy.get(Selectors.sideBarItem).eq(17).click();
    cy.get(Selectors.sideBarItemParts).eq(0).click();
    cy.get(Selectors.sideBarSubItem).eq(1).click();
    cy.wait(3000);
    cy.get(Selectors.sideBarSubItem).eq(0).click();
    cy.get(Selectors.firstItem).eq(1).click();
    cy.wait(5000);
    cy.get(Selectors.editItem).eq(0).click();
    cy.wait(5000);

    cy.get(Selectors.description)
      .eq(0)
      .clear()
      .type(`Edited on ${today}, at ${time} by Zafar`);

    for (let i = 0; i < 4; i++) {
      cy.get(Selectors.selectClick).eq(i).click();
      cy.get(Selectors.option)
        .eq(Math.floor(Math.random() * 4))
        .click();
    }

    for (let j = 1; j < 3; j++) {
      cy.get(Selectors.input)
        .eq(j)
        .clear()
        .type(Math.floor(Math.random() * 100) * 200);
    }

    for (let k = 3; k < 7; k++) {
      cy.get(Selectors.input)
        .eq(k)
        .clear()
        .type(Math.floor(Math.random() * 10) * 20);
    }

    cy.get(Selectors.submitButton).click();
  });
});
