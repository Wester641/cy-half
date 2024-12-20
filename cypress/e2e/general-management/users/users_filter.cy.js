describe("Login and create unit", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  const interceptEndpoints = () => {
    cy.intercept("GET", "/api/v1/vehicles/?offset=0&limit=10").as(
      "unitsRequest"
    );
    cy.intercept("GET", "/api/v1/dashboard/analytics/complete/").as(
      "completeRequest"
    );
    cy.intercept(
      "GET",
      "/api/v1/accounts/contacts/?enable_fleetio_access=true&offset=0&limit=10"
    ).as("contactsRequest");
    cy.intercept(
      "GET",
      "/api/v1/accounts/contacts/?enable_fleetio_access=true&status=active&offset=0&limit=10"
    ).as("activeContactsRequest");
    cy.intercept(
      "GET",
      "/api/v1/accounts/contacts/?enable_fleetio_access=true&status=archived&offset=0&limit=10"
    ).as("archivedContactsRequest");
    cy.intercept(
      "GET",
      "/api/v1/accounts/contacts/?enable_fleetio_access=true&status=inactive&offset=0&limit=10"
    ).as("inactiveContactsRequest");
  };

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1900, 1280);
    interceptEndpoints();
  });

  it("should login and verify title on production page", () => {
    // Login and verify URL
    cy.loginWith(email, password);
    cy.url({ timeout: 30000 }).should("include", "/units");

    // Verify dashboard analytics data
    cy.wait("@completeRequest", { timeout: 20000 }).then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      const { downtime_count, new_vehicles } = response.body;
      cy.log(`Downtime count: ${downtime_count}`);
      cy.log(`New vehicle count: ${new_vehicles.count}`);
      cy.log(`Last period days: ${new_vehicles.period_days}`);

      cy.get(".VehicleDiagrams_value__lOVbw")
        .eq(0)
        .should("be.visible")
        .and("have.text", downtime_count);
      cy.get(".VehicleDiagrams_value__lOVbw")
        .eq(1)
        .should("be.visible")
        .and("have.text", new_vehicles.count);
      cy.get("h2")
        .eq(0)
        .should("be.visible")
        .and("contain.text", `Last ${new_vehicles.period_days} Days`);
    });

    // Verify units count
    cy.wait("@unitsRequest", { timeout: 20000 }).then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      const unitsCount = response.body.count;
      cy.log(`Units count: ${unitsCount}`);
      cy.get(".VehicleDashboard_total__answer__zNlyX").should(
        "have.text",
        unitsCount
      );
    });

    // Navigate to contacts page and verify
    cy.get(".Sidebar_sidebarItem__2s00-").eq(2).click();
    cy.get(".Sidebar_sidebarItem__popup__b7axi > :nth-child(1)").click();
    cy.url({ timeout: 30000 }).should("include", "/users");

    cy.wait("@contactsRequest").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      cy.log(response.body);

      cy.get(".UserDashboard_total__answer__QLmtn")
        .should("include.text", response.body.count)
        .invoke("css", "box-shadow", "0 0 0 2px red")
        .wait(500)
        .invoke("css", "box-shadow", "none");
    });

    // Filter active contacts and verify response

    for (let i = 0; i < 2; i++) {
      cy.get(
        ":nth-child(2) > .UserList_list__1lO2Q > .UserFiltration_container__Bxx2z > .FilterWrapper_filter_wrapper__NcR16 > .ModalFiltersStaticOptions_blockFiltering__Jgi3d > .ModalFiltersStaticOptions_blockFiltering__blockText__lZ7eI > .ModalFiltersStaticOptions_blockFiltering__blockText_itemTextSearch__h7le5"
      ).click();
      cy.get(
        ".ModalFiltersStaticOptions_blockFiltering__trueModal_inModal_paddingModal_flexElement__wsEA4"
      )
        .eq(i)
        .click();
      cy.contains("Apply").click();
      cy.wait(1500);  
      cy.wait(
        "@activeContactsRequest" ||
          "@archivedContactsRequest" ||
          "@inactiveContactsRequest",
        { timeout: 20000 }
      ).then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        cy.log(response.body);
        cy.get(".UserDashboard_total__answer__QLmtn")
          .should("include.text", response.body.count)
          .invoke("css", "box-shadow", "0 0 0 2px red")
          .wait(500)
          .invoke("css", "box-shadow", "none");
      });
    }
  });
});
