import { Selectors, today, time } from "./selectors";
import { URLs } from "../../../../constants/links";

describe("Test create parts", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should create parts on production", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.visit(URLs.addParts);
    cy.wait(3000);

    cy.get(Selectors.input)
      .eq(0)
      .type(`Part #${Math.floor(Math.random() * 100) * 20000}`);

    cy.get(Selectors.description).type(
      `This part was created on ${today}, at ${time} by Zafar`
    );

    for (let i = 0; i < 4; i++) {
      cy.get(Selectors.selectClick).eq(i).click();
      cy.get(Selectors.option)
        .eq(Math.floor(Math.random() * 4))
        .click();
    }
    for (let j = 1; j < 3; j++) {
      cy.get(Selectors.input)
        .eq(j)
        .type(Math.floor(Math.random() * 100) * 200);
    }

    for (let k = 3; k < 7; k++) {
      cy.get(Selectors.input)
        .eq(k)
        .type(Math.floor(Math.random() * 10) * 20);
    }

    cy.get(Selectors.submitButton).click();
  });
});
