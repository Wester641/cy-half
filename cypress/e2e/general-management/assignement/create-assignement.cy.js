/// <reference types="cypress" />

describe("Checking assignement create function", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  const timeout = { timeout: 50000 };

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1700, 1200);
  });

  it("should check assignement create function", () => {
    cy.GET("/api/v1/company/", "firstRender");

    cy.loginWith(email, password);
    // cy.url({ timeout: 30000 }).should("include", "/units");
    cy.wait(1500);

    cy.wait("@firstRender", timeout).then((interception) => {
      expect([200, 201, 204]).to.include(interception.response.statusCode);
      cy.get(".Sidebar_sidebarItem__2s00-").eq(4).should("be.visible").click();
    });
    // css-19bb58m
    cy.get(".css-1yxmbwk", timeout).click();

    for (let i = 0; i < 2; i++) {
      cy.get(".css-19bb58m", timeout).eq(i).click(timeout);
      cy.get(".css-p7gue6-option", timeout)
        .eq(Math.floor(Math.random() * 6))
        .click();
      // .shadow();
    }

    cy.get("input[type='date']").eq(0).type("2024-12-17").trigger("change");

    cy.get("input[type='time']").eq(0).invoke("val", "05:00").trigger("change");

    // STARTING ODOMETER
    cy.get(".css-mnn31", timeout)
      .eq(2)
      .invoke("val")
      .then((value) => {
        if (!value) {
          cy.get(".css-mnn31").eq(2).type("30050").blur();
        }
      });

    cy.get("input[type='date']").eq(1).type("2024-12-27").trigger("change");

    cy.get("input[type='time']").eq(1).invoke("val", "19:00").trigger("change");

    // ENDING ODOMETER
    cy.get(".css-mnn31", timeout)
      .eq(2)
      .invoke("val")
      .then((value) => {
        if (value) {
          cy.get(".css-mnn31")
            .eq(5)
            .type(`${value + 1}`)
            .blur();
        } else {
          cy.get(".css-mnn31").eq(5).type("30100").blur();
        }
      });
    cy.get(".css-10oer18")
      .eq(0)
      .type("Some description for assignement vehicle")
      .blur();

    cy.get("button[type='submit']", timeout).click();
  });
});
