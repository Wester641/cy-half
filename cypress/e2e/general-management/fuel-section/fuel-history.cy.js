// <reference types="cypress" />

describe("Login and create unit", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  beforeEach(() => {
    cy.visit("/");
  });

  it("should fill all fields and create fuel-history", () => {
    cy.loginWith(email, password);
    cy.url({ timeout: 50000 }).should("include", "/units");
    cy.visit("/fuel-history");
    cy.wait(3000);
    cy.visit("/fuel-history/create");
    cy.wait(3000);

    cy.intercept("POST", "/api/v1/fuel-entries/create/").as("createFuel");

    for (let i = 0; i < 2; i++) {
      cy.get(".css-19bb58m").eq(i).click();
      cy.get(".css-p7gue6-option")
        .eq(Math.floor(Math.random() * 5))
        .click();
    }
    cy.get(".css-mnn31")
      .eq(2)
      .type(Math.floor(Math.random() * 100) * 200);

    cy.get(".css-mnn31")
      .eq(3)
      .type(Math.floor(Math.random() * 100) * 2000);

    cy.get(".css-mnn31")
      .eq(4)
      .then(() => {
        const gallons = Math.floor(Math.random() * 300);
        cy.get(".css-mnn31").eq(4).type(gallons);
        if (gallons) {
          cy.get(".css-10oer18")
            .eq(0)
            .type(gallons + " gallons were refueled.");
        }
      });

    cy.get(".css-mnn31").eq(5).type(5);
    cy.get(".css-mnn31").eq(6).type("GAS");
    cy.get(".css-1jaw3da")
      .eq(Math.floor(Math.random() * 2))
      .click();

    cy.get("button[type='submit']").click();

    cy.wait("@createFuel", { timeout: 30000 }).then(({ response }) => {
      expect([200, 201, 204]).to.include(response?.statusCode);
    });
    cy.get(".css-q34dxg").eq(20).click();
    cy.wait(3000);
  });

  // DELETE
  it("should delete fuel-history", () => {
    cy.loginWith(email, password);
    cy.url({ timeout: 50000 }).should("include", "/units");
    cy.visit("/fuel-history");
    cy.wait(3000);

    cy.get(".css-q34dxg").eq(10).should("be.visible").click();
    cy.get(".css-1km1ehz").eq(1).should("be.visible").click();
    cy.get(".css-1hw9j7s").eq(1).should("be.visible").click();
  });
});
