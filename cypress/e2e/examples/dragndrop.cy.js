describe("Login and Redirect Test", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";
  const prodUrl = "https://app.easyfleet.ai";

  beforeEach(() => {
    cy.visit(prodUrl);
    cy.viewport(1700, 1200);
  });

  it("should login and verify title on production page", () => {
    cy.get('input[type="text"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 30000 }).should(
      "include",
      "https://app.easyfleet.ai/units?page=1"
    );

    cy.wait(2000);

    cy.contains(
      ".VehicleDashboard_vehicle_dashboard__buttons__J-w4y",
      "Add Unit"
    )
      .should("be.visible")
      .click();

    cy.url({ timeout: 30000 }).should(
      "include",
      "https://app.easyfleet.ai/create-unit"
    );

    cy.get('[name="name"]').type("FAKE UNIT NAME");
    cy.get('[name="vin_sn"]').type("123123132132");
    cy.get('[name="license_plate"]').type("IL-TRK12123");
    cy.get('[name="year"]').type("2025");

    cy.wait(2000);

    cy.contains("button", "Save").should("be.visible").click();

    cy.contains(".Toastify__toast-body", "Success!", { timeout: 30000 }).should(
      "be.visible"
    );

    cy.wait(2000);

    cy.contains(".css-q34dxg", "FAKE UNIT NAME").should("be.visible"); // .click(); если хотите увидеть подробную информацию
  });
});
