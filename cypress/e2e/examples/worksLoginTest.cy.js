describe("Login and Redirect Test To Units Page", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1600, 1200);
  });

  it("should login and verify title on production page", () => {
    cy.write('input[type="text"]', email);
    cy.write('input[type="password"]', password);
    cy.itemClick('button[type="submit"]');

    cy.url({ timeout: 10000 }).should("include", "/units?page=1");
    // cy.wait(1000);

    // cy.contains(
    //   ".VehicleDashboard_vehicle_dashboard__buttons__J-w4y",
    //   "Add Unit"
    // )
    //   .should("be.visible")
    //   .click();

    // cy.url({ timeout: 20000 }).should("include", "/create-unit");
    // cy.get('[name="name"]').type("TEST UNIT NAME");
    // cy.contains("button", "Save").should("be.visible").click();
  });
});
