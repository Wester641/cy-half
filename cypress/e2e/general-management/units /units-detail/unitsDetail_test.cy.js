describe("Login and Redirect Test To Units Page", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should check all fields in units detail page with API data", () => {
    cy.loginEnter(email, password);
    cy.url().should("include", "/units");

    cy.intercept("GET", "/api/v1/vehicles/**/").as("getIdUnitDetail");
    cy.intercept("GET", "/api/v1/vehicles/**/latest-odometer/").as(
      "getInfoLatestOdometer"
    );
    cy.intercept("GET", "/api/v1/vehicles/**/linked/").as(
      "getLinkedUnitDetail"
    );
    cy.get(".css-1liixou").eq(0).click(); // Here you can change the unit name and check
    cy.wait(3000);

    // ONLY CHECKING API DATA

    cy.wait("@getIdUnitDetail").then((interception) => {
      const unitsDetail = interception?.response?.body;
      cy.wait(2500);
      expect([200, 201, 204]).to.include(interception.response.statusCode);

      if (unitsDetail?.name) {
        cy.get(".Breadcrumb_breadcrumb__current_text__26lCj").should(
          "have.text",
          unitsDetail.name
        );
        cy.get(".DetailInfo_profile__info__title__2XtbT").should(
          "have.text",
          unitsDetail.name
        );
      }

      // TODO: After fixing type field, need to remove this check
      if (unitsDetail?.type?.name === null) {
        cy.get(".DetailInfo_profile__info__desc__U6qdb").should(
          "have.text",
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

        cy.get(".DetailInfo_profile__info__driver__3hWmx")
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
        cy.get(".DetailField_data__bOXlw")
          .eq(index)
          .should("have.text", value !== null && value)
          .wait(250);
      });
    });

    // CHECKING ADD COMMENT FUNCTION

    cy.intercept("POST", "/api/v1/vehicles/comments/create/").as("addComment");
    cy.get('[placeholder="Add a comment"]')
      .should("be.visible")
      .type("In my opinion, this is a very good vehicle.");

    cy.get(".MuiButton-contained").should("be.visible").click();

    cy.wait("@addComment").then((interception) => {
      cy.log(interception.response.body.comment);
      cy.log(interception?.response?.body?.created_by?.first_name);
      expect([200, 201]).to.include(interception.response.statusCode);
      cy.get(".CommentItem_comment__name__E9dc2")
        .eq(0)
        .should(
          "include.text",
          `${interception?.response?.body?.created_by?.first_name}`
        );
    });

    cy.wait(2500);

    // CHECKING DELETE COMMENT FUNCTION

    cy.intercept("DELETE", "/api/v1/vehicles/**/comments/delete/").as(
      "deleteComment"
    );
    cy.get(".css-1yxmbwk").eq(2).should("be.visible").click();
    cy.contains("Delete").should("be.visible").click();

    cy.wait("@deleteComment").then((deleteComment) => {
      expect([200, 201, 204]).to.include(deleteComment?.response?.statusCode);
    });

    // CHECKING LINKED VEHICLES FUNCTION

    //getLinkedUnitDetail
    cy.wait("@getLinkedUnitDetail").then((linkedVehicles) => {
      expect([200, 201, 204]).to.include(linkedVehicles?.response?.statusCode);
      const linked_assets = linkedVehicles.response.body;
      console.log(linked_assets);

      cy.get(".DetailInfo_profile__info__title__2XtbT").should(
        "have.text",
        linked_assets.name
      );
      linked_assets.linked_vehicles.forEach((vehicle, index) => {
        cy.get(".ItemCard_item_card__content__title__t740I")
          .eq(index)
          .should("have.text", vehicle.name);
      });

      cy.intercept("PATCH", `/api/v1/vehicles/**/link/`).as(
        "linkVehicleRequest"
      );

      // Checking Linked Assets Widget
      cy.get(".SectionCard_section_card__header__button_cont__button__EjwCb")
        .eq(3)
        .should("be.visible")
        .and("have.text", "Link Asset")
        .click();
      cy.get(".css-19bb58m").should("be.visible").click();

      cy.get(".css-p7gue6-option")
        .eq(Math.floor(Math.random() * 10))
        .click();

      cy.contains("Save").should("be.visible").click();

      cy.wait("@linkVehicleRequest").then(() => {
        expect([200, 201, 204]).to.include(
          linkedVehicles?.response?.statusCode
        );
      });

      cy.success("Vehicle successfully linked!");

      cy.wait(2500);

      cy.intercept("PATCH", `/api/v1/vehicles/**/unlink/`).as("unlinkVehicle");

      cy.contains(".ItemCard_button__LMaiC", "Unassign").click({ force: true });
    });
    cy.success("Vehicle successfully unlinked!");

    cy.wait(2500);
    cy.get(".MuiBreadcrumbs-li").eq(0).click();
  });
});
