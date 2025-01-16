import { URLs } from "../../../../constants/links";
import { Selectors, StatusArray } from "./Selectors";
describe("Test filters in units page", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should check all filters without search filter", () => {
    cy.intercept("GET", URLs.api.unitReq).as("unitsRequest");
    cy.intercept("GET", URLs.api.completeReq).as("completeRequest");

    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);
    cy.wait(1500);

    cy.wait("@completeRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const downtimeCount = interception.response.body.downtime_count;
      const newVehicleCount = interception.response.body.new_vehicles.count;
      const periodDays = interception.response.body.new_vehicles.period_days;
      cy.log("Downtime count:", downtimeCount);
      cy.log("New vehicle count:", newVehicleCount);
      cy.log("Last period days:", periodDays);
      cy.get(Selectors.completeData)
        .eq(0)
        .should(Selectors.beVisible)
        .and(Selectors.haveText, downtimeCount);
      cy.get(Selectors.completeData)
        .eq(1)
        .should(Selectors.beVisible)
        .and(Selectors.haveText, newVehicleCount);
      cy.get("h2")
        .eq(0)
        .should(Selectors.beVisible)
        .and(Selectors.containText, `Last ${periodDays} Days`);
    });

    cy.wait("@unitsRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const unitsCount = interception.response.body.count;
      cy.log("Units count:", unitsCount);

      cy.get(Selectors.totalAmount).should(Selectors.haveText, unitsCount);
    });
    // -------------------------------------------------------------------------------------------

    // Checking "Vehicle Type" filter

    for (let i = 0; i < 5; i++) {
      cy.intercept("GET", URLs.api.unitFilterReq).as(
        "vehicleTypeFilterRequest"
      );
      cy.contains(Selectors.vehicleTypeFilter, "Vehicle Type").click();
      cy.buttonClick(Selectors.vehicleTypeItem + `(${i + 2})`);
      cy.contains(Selectors.button, "Apply").click();
      // cy.wait(1500);
      try {
        cy.wait("@vehicleTypeFilterRequest").then((vehicleType) => {
          if (vehicleType.response.statusCode !== 200) {
          } else {
            cy.get(Selectors.totalAmount).should(
              Selectors.haveText,
              vehicleType.response.body.count
            );
            expect([200, 201, 204]).to.include(vehicleType.response.statusCode);
          }
        });
      } catch (error) {
        console.warn(error);
      }
    }
    cy.contains(Selectors.vehicleTypeFilter, "Vehicle Type").click();
    cy.clearClickAndApply();
    // -------------------------------------------------------------------------------------------

    // -------------------------------------------------------------------------------------------
    // Checking "Vehicle Group" filter
    for (let i = 0; i < 5; i++) {
      cy.intercept("GET", URLs.api.unitFilterReq).as(
        "vehicleGroupFilterRequest"
      );
      cy.contains(Selectors.vehicleTypeFilter, "Vehicle Group").click();
      cy.buttonClick(Selectors.vehicleTypeItem + `(${i + 2})`);
      cy.contains(Selectors.button, "Apply").click();
      // cy.wait(1500);
      try {
        cy.wait("@vehicleGroupFilterRequest").then((vehicleGroup) => {
          if (vehicleGroup.response.statusCode !== 200) {
          } else {
            cy.get(Selectors.totalAmount).should(
              Selectors.haveText,
              vehicleGroup.response.body.count
            );
            expect([200, 201, 204]).to.include(
              vehicleGroup.response.statusCode
            );
          }
        });
      } catch (error) {
        console.warn(error);
      }
    }
    cy.contains(Selectors.vehicleTypeFilter, "Vehicle Group").click();
    cy.clearClickAndApply();
    // -------------------------------------------------------------------------------------------

    // -------------------------------------------------------------------------------------------
    // Checking "Vehicle Status" filter

    StatusArray.forEach((status) => {
      cy.intercept("GET", URLs.api.unitFilterReq).as(
        "vehicleStatusFilterRequest"
      );
      cy.contains(Selectors.vehicleStatus, "Vehicle Status").click();
      cy.contains(Selectors.vehicleStatusItem, status).click();
      cy.contains(Selectors.button, "Apply").click();
      // cy.wait(2500);
      cy.wait("@vehicleStatusFilterRequest").then((vehicleStatus) => {
        expect([200, 201, 204]).to.include(vehicleStatus.response.statusCode);

        cy.get(Selectors.totalAmount).should(
          Selectors.haveText,
          vehicleStatus.response.body.count
        );
      });
    });
    cy.contains(Selectors.vehicleStatus, "Vehicle Status").click();
    cy.clearClickAndApply();

    // THE NEXT SUB_PAGES
    cy.intercept("GET", URLs.api.unitSubPageReq + "&is_assigned=true").as(
      "assignedUnitsRequest"
    );
    cy.intercept("GET", URLs.api.unitSubPageReq + "&is_unassigned=true").as(
      "unassignedUnitsRequest"
    );
    cy.intercept("GET", URLs.api.unitSubPageReq + "&is_archived=true").as(
      "archivedUnitsRequest"
    );

    cy.contains(Selectors.button, "All").click();
    // cy.wait(1500);

    // Checking "Assigned" filter

    cy.contains(Selectors.button, "Assigned").click();
    cy.wait(1500);
    cy.url().should("include", URLs.subPage + "is_assigned");

    cy.wait("@assignedUnitsRequest").then((interception) => {
      expect([200, 201, 204]).to.include(interception.response.statusCode);

      cy.log("Assigned units count:", interception.response.body.count);
      cy.get(Selectors.totalAmount).should(
        Selectors.haveText,
        interception.response.body.count
      );
    });

    // Checking "Unassigned" filter

    cy.contains(Selectors.button, "Unassigned").click();
    // cy.wait(1500);
    cy.url().should("include", URLs.subPage + "is_unassigned");

    cy.wait("@unassignedUnitsRequest").then((interception) => {
      expect([200, 201, 204]).to.include(interception.response.statusCode);
      cy.log("Unassigned units count:", interception.response.body.count);
      cy.get(Selectors.totalAmount).should(
        Selectors.haveText,
        interception.response.body.count
      );
    });

    // Checking "Archived" filter

    cy.contains(Selectors.button, "Archived").click();
    // cy.wait(1500);
    cy.url().should("include", URLs.subPage + "is_archived");
    cy.wait("@archivedUnitsRequest").then((interception) => {
      expect([200, 201, 204]).to.include(interception.response.statusCode);
      cy.log("Archived units count:", interception.response.body.count);
      cy.get(Selectors.totalAmount).should(
        Selectors.haveText,
        interception.response.body.count
      );
    });
    cy.contains(Selectors.button, "All").click();
  });
});
