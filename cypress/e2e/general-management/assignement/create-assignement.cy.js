/// <reference types="cypress" />

describe("Checking assignement create function", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");


  const timeout = { timeout: 50000 };

  beforeEach(() => {
    cy.visit("/");
  });

  it("should fill all fields and create assignement", () => {
    cy.loginWith(email, password);
    cy.url(timeout).should("include", "/units");
    cy.visit("/assignments");
    cy.wait(3000);

    cy.get(".css-1yxmbwk", timeout).click();

    for (let i = 0; i < 2; i++) {
      cy.get(".css-19bb58m", timeout).eq(i).click(timeout);
      cy.get(".css-p7gue6-option", timeout)
        .eq(Math.floor(Math.random() * 6))
        .click();
    }

    cy.get(".css-mnn31", timeout)
      .eq(0)
      .invoke("val", "2024-12-24")
      .trigger("input")
      .trigger("change");

    cy.get(".css-mnn31", timeout)
      .eq(2)
      .invoke("val")
      .then((value) => {
        if (!value) {
          cy.get(".css-mnn31")
            .eq(2)
            .type(Math.floor(Math.random() * 50) * 300)
            .blur();
        }
      });

    cy.get(".css-mnn31", timeout)
      .eq(3)
      .invoke("val", "2024-12-27")
      .trigger("input")
      .trigger("change");

    cy.get(".css-10oer18")
      .eq(0)
      .type("Some description for assignement vehicle");
    cy.wait(3000);

    cy.get("button[type='submit']", timeout).click();
  });

  it("should find created assignement and edit it", () => {
    cy.loginWith(email, password);
    cy.url(timeout).should("include", "/units");
    cy.visit("/assignments");
    cy.wait(3000);

    cy.contains("Ozodbek", timeout).should("be.visible").click();
    cy.get(".css-mrqjss").eq(0).click();

    cy.get(".css-mnn31", timeout)
      .eq(0)
      .invoke("val", "2024-12-26")
      .trigger("input")
      .trigger("change");

    cy.get(".css-mnn31", timeout)
      .eq(3)
      .invoke("val", "2025-01-27")
      .trigger("input")
      .trigger("change");

    for (let i = 0; i < 2; i++) {
      cy.get(".css-19bb58m", timeout).eq(i).click(timeout);
      cy.get(".css-p7gue6-option", timeout)
        .eq(Math.floor(Math.random() * 6))
        .click();
    }

    cy.get(".css-10oer18")
      .eq(0)
      .type("Some description for editing assignement vehicles");
    cy.wait(3000);

    cy.get("button[type='submit']", timeout).click();
  });
});
