import { Selectors } from "./selectors";
import { URLs } from "../../../../constants/links";

describe("ADD LABOR TO WORK ORDER", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should  ADD LABOR TO WORK ORDER", () => {
    // Login and verify URL
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    //ADD TO WORK_ORDER
    cy.get(".IssueStatus_status__solve__QTQRL").click();
    cy.wait(1000);
    cy.contains("Add to Work Order").should("be.visible").click();

    cy.wait(3000);

    for (let j = 2; j < 7; j++) {
      cy.get(Selectors.selectClick).eq(j).click();
      cy.get(".css-p7gue6-option")
        .eq(Math.floor(Math.random() * 3))
        .click();
    }
    cy.get(Selectors.selectClick).eq(7).click();
    cy.get(".css-14ze5ko-option")
      .eq(Math.floor(Math.random() * 5))
      .click();

    cy.get(Selectors.input)
      .eq(10)
      .type(Math.floor(Math.random() * 20));

    cy.get(Selectors.input)
      .eq(11)
      .type(Math.floor(500 + Math.floor(Math.random() * 2000)));

    // ADD LABOR TO WORK ORDER

    cy.get(".css-1q2h7u5").eq(4).click();
    cy.get(".css-1rs06yn").eq(0).click();
    cy.get(".css-14ze5ko-option")
      .eq(Math.floor(Math.random() * 5))
      .click();

    cy.get(Selectors.input)
      .eq(12)
      .type(Math.floor(Math.random() * 10));
    cy.get(Selectors.input)
      .eq(13)
      .type(Math.floor(Math.floor(Math.random() * 100)));

    cy.get(Selectors.selectClick).eq(11).click();
    cy.get(".css-12dyb37-menu").click();
    cy.get(".css-1hw9j7s").eq(3).click();

    cy.get(".css-1hw9j7s").eq(1).click();
  });
});
