import { URLs } from "../../../../constants/links";
import { Selectors } from "./Selectors";

describe("Test unit detail page", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should check all fields in units detail page with API data", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);

    cy.intercept("GET", URLs.api.getUnitDetail).as("getIdUnitDetail");
    cy.intercept("GET", URLs.api.getInfoLatestOdometerReq).as(
      "getInfoLatestOdometer"
    );
    cy.intercept("GET", URLs.api.getLinkedUnitDetailReq).as(
      "getLinkedUnitDetail"
    );
    cy.get(Selectors.firstUnit).eq(0).click();
    cy.wait(3000);

    cy.wait("@getIdUnitDetail").then((interception) => {
      const unitsDetail = interception?.response?.body;
      cy.wait(2500);
      expect([200, 201, 204]).to.include(interception.response.statusCode);

      if (unitsDetail?.name) {
        cy.get(Selectors.breadCrumb).should(
          Selectors.haveText,
          unitsDetail.name
        );
        cy.get(Selectors.title).should(Selectors.haveText, unitsDetail.name);
      }

      if (unitsDetail?.type?.name === null) {
        cy.get(Selectors.subTitle).should(
          Selectors.haveText,
          `${unitsDetail?.type?.name || "&nbsp;"}· ${
            unitsDetail?.year || "No year"
          } ${unitsDetail?.make?.name || "No make"} ${
            unitsDetail?.model?.name || "No model"
          } · ${unitsDetail?.vin_sn || "No vin/sn code"}· ${
            unitsDetail?.license_plate || "No license plate"
          }`
        );
      }
      cy.wait("@getInfoLatestOdometer").then((odometer) => {
        const unitsOdometer = odometer?.response?.body;

        cy.log("Meter:", unitsDetail?.meter || unitsOdometer?.meter_value);
        cy.log("Status:", unitsDetail?.status);
        cy.log("Group:", unitsDetail?.group?.name);
        cy.log(
          "Operator:",
          unitsDetail?.current_operator
            ? unitsDetail?.current_operator?.first_name
            : unitsDetail?.operator?.first_name
        );

        const meterValue =
          unitsDetail?.meter || unitsOdometer?.meter_value || "No meter";
        const statusValue = unitsDetail?.status || "";
        const groupValue = unitsDetail?.group?.name || "No Group";
        const operatorValue = unitsDetail?.current_operator
          ? unitsDetail?.current_operator?.first_name || "No operator"
          : unitsDetail?.operator?.first_name || "No operator";

        const expectedText = `${meterValue}${statusValue}${groupValue}${operatorValue}`;

        cy.get(Selectors.secondSubTitle)
          .invoke("text")
          .then((actualText) => {
            cy.log("Expected:", expectedText);
            cy.log("Actual:", actualText);
            expect(actualText).to.equal(expectedText);
          });
      });
      const details = [
        { index: 0, value: unitsDetail?.group?.name || "---" },
        { index: 1, value: unitsDetail?.operator?.first_name || "---" },
        { index: 2, value: unitsDetail?.type?.name || "---" },
        { index: 3, value: unitsDetail?.fuel_type?.name || "---" },
        { index: 4, value: unitsDetail?.vin_sn || "---" },
        { index: 5, value: unitsDetail?.license_plate || "---" },
        { index: 6, value: unitsDetail?.year || "---" },
        { index: 7, value: unitsDetail?.make?.name || "---" },
        { index: 8, value: unitsDetail?.model?.name || "---" },
        { index: 9, value: unitsDetail?.trim || "---" },
        {
          index: 10,
          value: unitsDetail?.registration_state_province || "---",
        },
        { index: 11, value: unitsDetail?.color || "---" },
        { index: 12, value: unitsDetail?.ownership || "---" },
        { index: 13, value: unitsDetail?.body_type?.name || "---" },
        { index: 14, value: unitsDetail?.body_subtype?.name || "---" },
        { index: 15, value: unitsDetail?.msrp || 0 },
      ];

      details.forEach(({ index, value }) => {
        cy.get(Selectors.detailInfoBox)
          .eq(index)
          .should(Selectors.haveText, value !== null && value)
          .wait(250);
      });
    });

    // Checking add comment function
    cy.intercept("POST", URLs.api.createCommentReq).as("addComment");
    cy.get(Selectors.commentField)
      .should(Selectors.beVisible)
      .type("In my opinion, this is a very good vehicle.");

    cy.get(Selectors.addCommentButton).should(Selectors.beVisible).click();
    cy.wait("@addComment").then((interception) => {
      cy.log(interception.response.body.comment);
      cy.log(interception?.response?.body?.created_by?.first_name);
      expect([200, 201]).to.include(interception.response.statusCode);
      cy.get(Selectors.titleUserComment)
        .eq(0)
        .should(
          "include.text",
          `${interception?.response?.body?.created_by?.first_name}`
        );
    });
    cy.wait(2500);

    // Checking delete comment function
    cy.intercept("DELETE", URLs.api.deleteCommentReq).as("deleteComment");
    cy.get(Selectors.threeDotsMenu).eq(2).should(Selectors.beVisible).click();
    cy.contains(Selectors.delete).should(Selectors.beVisible).click();

    cy.wait("@deleteComment").then((deleteComment) => {
      expect([200, 201, 204]).to.include(deleteComment?.response?.statusCode);
    });

    // Checking Linked Vehicles Function
    cy.wait("@getLinkedUnitDetail").then((linkedVehicles) => {
      expect([200, 201, 204]).to.include(linkedVehicles?.response?.statusCode);
      const linked_assets = linkedVehicles.response.body;
      cy.log(linked_assets);

      cy.get(Selectors.title).should(Selectors.haveText, linked_assets.name);
      linked_assets.linked_vehicles.forEach((vehicle, index) => {
        cy.get(Selectors.linkedVehiclesList)
          .eq(index)
          .should(Selectors.haveText, vehicle.name);
      });
      cy.intercept("PATCH", URLs.api.linkVehicleReq).as("linkVehicleRequest");

      cy.get(Selectors.linkAssets)
        .eq(3)
        .should(Selectors.beVisible)
        .and(Selectors.haveText, "Link Asset")
        .click();
      cy.get(Selectors.optionUnits).should(Selectors.beVisible).click();

      cy.get(Selectors.selectUnit)
        .eq(Math.floor(Math.random() * 10))
        .click();

      cy.contains("Save").should(Selectors.beVisible).click();

      cy.wait("@linkVehicleRequest").then(() => {
        expect([200, 201, 204]).to.include(
          linkedVehicles?.response?.statusCode
        );
      });

      cy.success("Vehicle successfully linked!");

      cy.wait(2500);

      cy.intercept("PATCH", URLs.api.unLinkVehicleReq).as("unlinkVehicle");

      cy.contains(Selectors.unassigned, "Unassign").click({ force: true });
    });
    cy.success("Vehicle successfully unlinked!");

    cy.wait(2500);
    cy.get(Selectors.breadCrumbBack).eq(0).click();
  });
});
