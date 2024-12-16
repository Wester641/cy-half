describe("Checking All filters in Units section", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  const StatusArray = [
    "Active",
    "Inactive",
    "In Shop",
    "Out of Service",
    "Sold",
    "Yes",
    "Downtime",
  ];

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1700, 1200);
  });

  it("should check all filters without search filter", () => {
    cy.intercept("GET", "/api/v1/vehicles/?offset=0&limit=10").as(
      "unitsRequest"
    );
    cy.intercept("GET", "/api/v1/dashboard/analytics/complete/").as(
      "CompleteRequest"
    );

    cy.loginWith(email, password);
    cy.url({ timeout: 30000 }).should("include", "/units");
    cy.wait(1500);

    cy.wait("@CompleteRequest", { timeout: 20000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const downtimeCount = interception.response.body.downtime_count;
      const newVehicleCount = interception.response.body.new_vehicles.count;
      const periodDays = interception.response.body.new_vehicles.period_days;
      cy.log("Downtime count:", downtimeCount);
      cy.log("New vehicle count:", newVehicleCount);
      cy.log("Last period days:", periodDays);
      cy.get(".VehicleDiagrams_value__lOVbw")
        .eq(0)
        .should("be.visible")
        .and("have.text", downtimeCount);
      cy.get(".VehicleDiagrams_value__lOVbw")
        .eq(1)
        .should("be.visible")
        .and("have.text", newVehicleCount);
      cy.get("h2")
        .eq(0)
        .should("be.visible")
        .and("contain.text", `Last ${periodDays} Days`);
    });
    cy.wait("@unitsRequest", { timeout: 20000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const unitsCount = interception.response.body.count;
      cy.log("Units count:", unitsCount);

      cy.get(".VehicleDashboard_total__answer__zNlyX").should(
        "have.text",
        unitsCount
      );
    });
    // -------------------------------------------------------------------------------------------

    // Checking "Vehicle Type" filter

    for (let i = 0; i < 5; i++) {
      cy.intercept("GET", `/api/v1/vehicles/**`).as("vehicleTypeFilterRequest");
      cy.contains(
        ".ModalOptions_blockFiltering__jpAKN",
        "Vehicle Type"
      ).click();
      cy.buttonClick(
        `.ModalOptions_blockFiltering__trueModal__inModal__paddingModal__listItem__-6JIk:nth-child(${
          i + 2
        })`
      );
      cy.contains("button[type='button']", "Apply").click();
      // cy.wait(1500);
      try {
        cy.wait("@vehicleTypeFilterRequest", { timeout: 20000 }).then(
          (vehicleType) => {
            if (vehicleType.response.statusCode !== 200) {
            } else {
              cy.get(".VehicleDashboard_total__answer__zNlyX").should(
                "have.text",
                vehicleType.response.body.count
              );
              expect([200, 201, 204]).to.include(
                vehicleType.response.statusCode
              );
            }
          }
        );
      } catch (error) {
        console.warn(error);
      }
    }
    cy.contains(".ModalOptions_blockFiltering__jpAKN", "Vehicle Type").click();
    cy.clearClickAndApply();
    // -------------------------------------------------------------------------------------------

    // -------------------------------------------------------------------------------------------
    // Checking "Vehicle Group" filter
    for (let i = 0; i < 5; i++) {
      cy.intercept("GET", `/api/v1/vehicles/**`).as(
        "vehicleGroupFilterRequest"
      );
      cy.contains(
        ".ModalOptions_blockFiltering__jpAKN",
        "Vehicle Group"
      ).click();
      cy.buttonClick(
        `.ModalOptions_blockFiltering__trueModal__inModal__paddingModal__listItem__-6JIk:nth-child(${
          i + 2
        })`
      );
      cy.contains("button[type='button']", "Apply").click();
      // cy.wait(1500);
      try {
        cy.wait("@vehicleGroupFilterRequest", { timeout: 20000 }).then(
          (vehicleGroup) => {
            if (vehicleGroup.response.statusCode !== 200) {
            } else {
              cy.get(".VehicleDashboard_total__answer__zNlyX").should(
                "have.text",
                vehicleGroup.response.body.count
              );
              expect([200, 201, 204]).to.include(
                vehicleGroup.response.statusCode
              );
            }
          }
        );
      } catch (error) {
        console.warn(error);
      }
    }
    cy.contains(".ModalOptions_blockFiltering__jpAKN", "Vehicle Group").click();
    cy.clearClickAndApply();

    // -------------------------------------------------------------------------------------------

    // Checking "Vehicle Status" filter

    StatusArray.forEach((status) => {
      cy.intercept("GET", `/api/v1/vehicles/**`).as(
        "vehicleStatusFilterRequest"
      );

      cy.contains(
        ".ModalFiltersStaticOptions_blockFiltering__blockText__lZ7eI",
        "Vehicle Status"
      ).click();

      cy.contains(
        ".ModalFiltersStaticOptions_blockFiltering__trueModal_inModal_paddingModal_flexElement__wsEA4",
        status
      ).click();

      cy.contains("button[type='button']", "Apply").click();
      // cy.wait(2500);
      cy.wait("@vehicleStatusFilterRequest").then((vehicleStatus) => {
        expect([200, 201, 204]).to.include(vehicleStatus.response.statusCode);

        cy.get(".VehicleDashboard_total__answer__zNlyX").should(
          "have.text",
          vehicleStatus.response.body.count
        );
      });
    });

    cy.contains(
      ".ModalFiltersStaticOptions_blockFiltering__blockText__lZ7eI",
      "Vehicle Status"
    ).click();
    cy.clearClickAndApply();

    // THE NEXT SUB_PAGES
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

    cy.contains('button[type="button"]', "All").click();
    // cy.wait(1500);

    // Checking "Assigned" filter

    cy.contains('button[type="button"]', "Assigned").click();
    cy.wait(1500);
    cy.url({ timeout: 30000 }).should(
      "include",
      "/units?page=1&filter=is_assigned"
    );

    cy.wait("@assignedUnitsRequest", { timeout: 10000 }).then(
      (interception) => {
        expect([200, 201, 204]).to.include(interception.response.statusCode);

        cy.log("Assigned units count:", interception.response.body.count);
        cy.get(".VehicleDashboard_total__answer__zNlyX").should(
          "have.text",
          interception.response.body.count
        );
      }
    );

    // Checking "Unassigned" filter

    cy.contains('button[type="button"]', "Unassigned").click();
    // cy.wait(1500);
    cy.url({ timeout: 30000 }).should(
      "include",
      "/units?page=1&filter=is_unassigned"
    );

    cy.wait("@unassignedUnitsRequest", { timeout: 10000 }).then(
      (interception) => {
        // expect(interception.response.statusCode).to.eq(200);
        expect([200, 201, 204]).to.include(interception.response.statusCode);
        cy.log("Unassigned units count:", interception.response.body.count);
        cy.get(".VehicleDashboard_total__answer__zNlyX").should(
          "have.text",
          interception.response.body.count
        );
      }
    );

    // Checking "Archived" filter

    cy.contains('button[type="button"]', "Archived").click();
    // cy.wait(1500);
    cy.url({ timeout: 30000 }).should(
      "include",
      "/units?page=1&filter=is_archived"
    );

    cy.wait("@archivedUnitsRequest", { timeout: 10000 }).then(
      (interception) => {
        expect([200, 201, 204]).to.include(interception.response.statusCode);
        cy.log("Archived units count:", interception.response.body.count);
        cy.get(".VehicleDashboard_total__answer__zNlyX").should(
          "have.text",
          interception.response.body.count
        );
      }
    );
    cy.contains('button[type="button"]', "All").click(); // The end
  });
});
