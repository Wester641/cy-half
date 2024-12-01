describe("Checking filters", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1700, 1200);
  });

  it("should to start checked all filters in units page", () => {
    cy.intercept(
      "GET",
      "/api/v1/vehicles/?offset=0&limit=10&is_assigned=true"
    ).as("assignedUnitsRequest");

    cy.intercept(
      "GET",
      "/api/v1/vehicles/?offset=0&limit=10&is_unassigned=true"
    ).as("unassignedUnitsRequest");
    cy.intercept(
      "GET",
      "/api/v1/vehicles/?offset=0&limit=10&is_archived=true"
    ).as("archivedUnitsRequest");

    cy.loginWith(email, password);
    cy.url({ timeout: 30000 }).should("include", "/units?page=1");

    cy.contains('button[type="button"]', "All").click();
    cy.wait(1000);
    // Assigned

    cy.contains('button[type="button"]', "Assigned").click();
    cy.wait(2000);
    cy.url({ timeout: 30000 }).should(
      "include",
      "/units?page=1&filter=is_assigned"
    );

    cy.wait("@assignedUnitsRequest", { timeout: 10000 }).then(
      (interception) => {
        expect(interception.response.statusCode).to.eq(200);
        cy.log("Assigned units count:", interception.response.body.count);
        cy.get(".VehicleDashboard_total__answer__zNlyX").should(
          "have.text",
          interception.response.body.count
        );
      }
    );

    // Unassigned

    cy.contains('button[type="button"]', "Unassigned").click();
    cy.wait(2000);
    cy.url({ timeout: 30000 }).should(
      "include",
      "/units?page=1&filter=is_unassigned"
    );

    cy.wait("@unassignedUnitsRequest", { timeout: 10000 }).then(
      (interception) => {
        expect(interception.response.statusCode).to.eq(200);
        cy.log("Unassigned units count:", interception.response.body.count);
        cy.get(".VehicleDashboard_total__answer__zNlyX").should(
          "have.text",
          interception.response.body.count
        );
      }
    );

    // Archived

    cy.contains('button[type="button"]', "Archived").click();
    cy.wait(2000);
    cy.url({ timeout: 30000 }).should(
      "include",
      "/units?page=1&filter=is_archived"
    );

    cy.wait("@archivedUnitsRequest", { timeout: 10000 }).then(
      (interception) => {
        expect(interception.response.statusCode).to.eq(200);
        cy.log("Archived units count:", interception.response.body.count);
        cy.get(".VehicleDashboard_total__answer__zNlyX").should(
          "have.text",
          interception.response.body.count
        );
      }
    );
  });
});
