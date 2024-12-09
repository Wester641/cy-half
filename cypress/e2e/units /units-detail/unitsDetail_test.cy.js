describe("Login and Redirect Test To Units Page", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1700, 1080);
  });

  it("should check all fields in units detail page with API data", () => {
    cy.loginEnter(email, password);
    cy.url({ timeout: 10000 }).should("include", "/units");
    // cy.wait(1500);

    cy.intercept("GET", "/api/v1/vehicles/**/").as("getIdUnitDetail");
    cy.intercept("GET", "/api/v1/vehicles/**/linked/").as(
      "getLinkedUnitDetail"
    );
    cy.contains(".css-q34dxg", "TTruck").should("be.visible").click();
    cy.wait(3000);

    // ONLY CHECKING API DATA

    cy.wait("@getIdUnitDetail", { timeout: 10000 }).then((interception) => {
      const unitsDetail = interception?.response?.body;
      cy.wait(2500);
      expect([200, 201, 204]).to.include(interception.response.statusCode);
      console.log(unitsDetail);

      cy.get(".Breadcrumb_breadcrumb__current_text__26lCj").should(
        "have.text",
        unitsDetail.name
      );
      cy.get(".DetailInfo_profile__info__title__2XtbT").should(
        "have.text",
        unitsDetail.name
      );
      cy.get(".DetailInfo_profile__info__desc__U6qdb").should(
        "have.text",
        `${unitsDetail.type.name !== undefined && unitsDetail.type.name} · ${
          unitsDetail.year
        } ${unitsDetail.make.name} ${unitsDetail.model.name} · ${
          unitsDetail.vin_sn
        }· ${unitsDetail.license_plate}`
      );
      cy.get(".DetailInfo_profile__info__driver__3hWmx").should(
        "have.text",
        `${unitsDetail.meter === null ? "No meter" : unitsDetail.meter}${
          unitsDetail.status
        }${unitsDetail.group.name}${
          unitsDetail.current_operator === false
            ? unitsDetail.operator.first_name
            : unitsDetail.current_operator.first_name
        }`
      );
      const details = [
        { index: 0, value: unitsDetail.group.name },
        { index: 1, value: unitsDetail.operator.first_name },
        { index: 2, value: unitsDetail.type.name },
        { index: 3, value: unitsDetail.fuel_type.name },
        { index: 4, value: unitsDetail.vin_sn },
        { index: 5, value: unitsDetail.license_plate },
        { index: 6, value: unitsDetail.year },
        { index: 7, value: unitsDetail.make.name },
        { index: 8, value: unitsDetail.model.name },
        { index: 9, value: unitsDetail.trim },
        { index: 10, value: unitsDetail.registration_state_province },
        { index: 11, value: unitsDetail.color },
        { index: 12, value: unitsDetail.ownership },
        { index: 13, value: unitsDetail.body_type.name },
        { index: 14, value: unitsDetail.body_subtype.name },
        { index: 15, value: unitsDetail.msrp },
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
    cy.get('[placeholder="Add a comment"]', { timeout: 30000 })
      .should("be.visible")
      .type("In my opinion, this is a very good vehicle.");

    cy.get(".MuiButton-contained").should("be.visible").click();

    cy.wait("@addComment").then((interception) => {
      cy.log(interception.response.body.comment);
      cy.log(interception.response.body.created_by.first_name);
      expect([200, 201]).to.include(interception.response.statusCode);
      cy.get(".CommentItem_comment__name__E9dc2")
        .eq(0)
        .should(
          "include.text",
          `${interception.response.body.created_by.first_name}`
        );
      // cy.get(".CommentItem_comment__text__4wDBb")
      //   .eq(0)
      //   .should("include", `${interception.response.body.comment}&nbsp;`);
    });

    cy.wait(2500);

    // CHECKING DELETE COMMENT FUNCTION

    cy.intercept("DELETE", "/api/v1/vehicles/**/comments/delete/").as(
      "deleteComment"
    );
    cy.get(".css-1yxmbwk").eq(2).should("be.visible").click();
    cy.contains("Delete").should("be.visible").click();

    cy.wait("@deleteComment").then((deleteComment) => {
      expect([200, 201, 204]).to.include(deleteComment.response.statusCode);
    });

    // CHECKING LINKED VEHICLES FUNCTION

    //getLinkedUnitDetail
    cy.wait("@getLinkedUnitDetail").then((linkedVehicles) => {
      expect([200, 201, 204]).to.include(linkedVehicles.response.statusCode);
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
        .eq(Math.floor(Math.random() * 50))
        .click();

      cy.contains("Save").should("be.visible").click();

      cy.wait("@linkVehicleRequest", { timeout: 30000 }).then(() => {
        expect([200, 201, 204]).to.include(linkedVehicles.response.statusCode);
      });

      cy.success("Vehicle successfully linked!");

      cy.wait(2500);

      cy.intercept("PATCH", `/api/v1/vehicles/**/unlink/`).as("unlinkVehicle");

      cy.contains(".ItemCard_button__LMaiC", "Unassign").click({ force: true });
    });
    cy.success("Vehicle successfully unlinked!");
  });
});
