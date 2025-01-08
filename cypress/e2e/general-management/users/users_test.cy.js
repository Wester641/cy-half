describe("Login and create unit", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should login and verify title on production page", () => {
    cy.intercept("GET", "/api/v1/vehicles/?offset=0&limit=10").as(
      "unitsRequest"
    );
    cy.intercept("GET", "/api/v1/dashboard/analytics/complete/").as(
      "CompleteRequest"
    );

    cy.loginWith(email, password);
    cy.url().should("include", "/units");
    cy.wait(1500);

    cy.wait("@CompleteRequest").then((interception) => {
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
    cy.wait("@unitsRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const unitsCount = interception.response.body.count;
      cy.log("Units count:", unitsCount);

      cy.get(".VehicleDashboard_total__answer__zNlyX").should(
        "have.text",
        unitsCount
      );
    });
    cy.intercept(
      "GET",
      "/api/v1/accounts/contacts/?enable_fleetio_access=true&offset=0&limit=10"
    ).as("Contacts");

    cy.intercept(
      "GET",
      "/api/v1/accounts/contacts/?enable_fleetio_access=true&status=invited&offset=0&limit=10"
    ).as("InvitedContacts");
    cy.intercept(
      "GET",
      "/api/v1/accounts/contacts/?enable_fleetio_access=true&offset=0&limit=10&is_archived=true"
    ).as("ArchivedContacts");

    cy.get(".Sidebar_sidebarItem__2s00-").eq(2).should("be.visible").click();
    cy.get(".Sidebar_sidebarItem__popup__b7axi > :nth-child(1)").click();
    cy.url().should("include", "/users");

    cy.wait("@Contacts").then((contacts) => {
      expect(contacts.response.statusCode).to.eq(200);
      const contactsData = contacts.response.body;
      cy.log(contactsData);

      cy.get(".UserDashboard_total__answer__QLmtn")
        .should("include.text", contactsData.count)
        .wait(500);

      cy.get(".css-q34dxg")
        .eq(1)
        .contains(contactsData.results[0].first_name)
        .invoke("css", "border", "2px solid red")
        .wait(10)
        .should("include.text", contactsData.results[0].first_name)
        .invoke("css", "border", "none");
      cy.get(".css-q34dxg")
        .eq(2)
        .contains(contactsData.results[0].email)
        .invoke("css", "border", "2px solid red")
        .wait(10)
        .should("include.text", contactsData.results[0].email)
        .invoke("css", "border", "none");
      cy.get(".css-q34dxg")
        .eq(3)
        .contains(contactsData.results[0].status)
        .invoke("css", "border", "2px solid red")
        .wait(10)
        .should("include.text", contactsData.results[0].status)
        .invoke("css", "border", "none");
      cy.get(".css-q34dxg")
        .eq(4)
        .contains(contactsData.results[0].role?.name || "---")
        .invoke("css", "border", "2px solid red")
        .wait(10)
        .should("include.text", contactsData.results[0].role?.name || "---")
        .invoke("css", "border", "none");
      cy.get(".css-q34dxg")
        .eq(5)
        .contains(contactsData.results[0].group?.name || "---")
        .invoke("css", "border", "2px solid red")
        .wait(10)
        .should("include.text", contactsData.results[0].group?.name || "---")
        .invoke("css", "border", "none");
      cy.get(".css-q34dxg")
        .eq(6)
        .contains(contactsData.results[0].group?.name || "---")
        .invoke("css", "border", "2px solid red")
        .wait(10)
        .should(
          "include.text",
          contactsData.results[0].assigned_vehicles?.name || "---"
        )
        .invoke("css", "border", "none");

      cy.GET(
        "/api/v1/accounts/contacts/?enable_fleetio_access=true&status=active&offset=0&limit=10",
        "ActiveContacts"
      );
      cy.get(".css-1q2h7u5").eq(1).click();
      cy.wait("@ActiveContacts").then((activeUser) => {
        const activeUserData = activeUser.response.body;
        cy.get(".UserDashboard_total__answer__QLmtn").should(
          "include.text",
          activeUserData.count
        );

        cy.get(".css-q34dxg")
          .eq(81)
          .invoke("css", "border", "2px solid red")
          .should("include.text", activeUserData.results[0].first_name)
          .wait(10)
          .invoke("css", "border", "none");
        cy.get(".css-q34dxg")
          .eq(82)
          .invoke("css", "border", "2px solid red")
          .should("include.text", activeUserData.results[0].email)
          .wait(10)
          .invoke("css", "border", "none");
        cy.get(".css-q34dxg")
          .eq(83)
          .invoke("css", "border", "2px solid red")
          .should("include.text", activeUserData.results[0].status)
          .wait(10)
          .invoke("css", "border", "none");
        cy.get(".css-q34dxg")
          .eq(84)
          .invoke("css", "border", "2px solid red")
          .should(
            "include.text",
            activeUserData.results[0]?.role?.name || "---"
          )
          .wait(10)
          .invoke("css", "border", "none");
        cy.get(".css-q34dxg")
          .eq(85)
          .contains(activeUserData.results[0]?.group?.name || "---")
          .invoke("css", "border", "2px solid red")
          .wait(10)
          .should(
            "include.text",
            activeUserData.results[0]?.group?.name || "---"
          )
          .invoke("css", "border", "none");
        cy.get(".css-q34dxg")
          .eq(86)
          .contains(activeUserData.results[0]?.group?.name || "---")
          .invoke("css", "border", "2px solid red")
          .wait(10)
          .should(
            "include.text",
            activeUserData.results[0]?.assigned_vehicles?.name || "---"
          )
          .invoke("css", "border", "none");
      });

      // CHECKING INVITED USERS
      cy.GET(
        "/api/v1/accounts/contacts/?enable_fleetio_access=true&status=invited&offset=0&limit=10",
        "InvitedContacts"
      );
      cy.get(".css-1q2h7u5").eq(2).click();
      cy.wait("@InvitedContacts").then((invitedUser) => {
        const invitedUserData = invitedUser.response.body;
        cy.get(".UserDashboard_total__answer__QLmtn").should(
          "include.text",
          invitedUserData.count
        );

        cy.get(".css-q34dxg")
          .eq(17)
          .invoke("css", "border", "2px solid red")
          .should("include.text", invitedUserData.results[0].first_name)
          .wait(10)
          .invoke("css", "border", "none");
        cy.get(".css-q34dxg")
          .eq(18)
          .invoke("css", "border", "2px solid red")
          .should("include.text", invitedUserData.results[0].email)
          .wait(10)
          .invoke("css", "border", "none");
        cy.get(".css-q34dxg")
          .eq(19)
          .invoke("css", "border", "2px solid red")
          .should("include.text", invitedUserData.results[0].status)
          .wait(10)
          .invoke("css", "border", "none");
        cy.get(".css-q34dxg")
          .eq(20)
          .invoke("css", "border", "2px solid red")
          .should(
            "include.text",
            invitedUserData.results[0]?.role?.name || "---"
          )
          .wait(10)
          .invoke("css", "border", "none");
        cy.get(".css-q34dxg")
          .eq(21)
          .contains(invitedUserData.results[0]?.group?.name || "---")
          .invoke("css", "border", "2px solid red")
          .wait(10)
          .should(
            "include.text",
            invitedUserData.results[0]?.group?.name || "---"
          )
          .invoke("css", "border", "none");
        cy.get(".css-q34dxg")
          .eq(22)
          .contains(
            invitedUserData.results[0]?.assigned_vehicles?.name || "---"
          )
          .invoke("css", "border", "2px solid red")
          .wait(10)
          .should(
            "include.text",
            invitedUserData.results[0]?.assigned_vehicles?.name || "---"
          )
          .invoke("css", "border", "none");
      });
    });

    // CHECKING ARCHIVED USERS
    cy.GET(
      "/api/v1/accounts/contacts/?enable_fleetio_access=true&status=invited&offset=0&is_archived=true",
      "ArchivedContacts"
    );
    cy.get(".css-1q2h7u5").eq(3).click();
    cy.wait("@ArchivedContacts").then((archivedUser) => {
      const archivedUserData = archivedUser.response.body;
      cy.get(".UserDashboard_total__answer__QLmtn").should(
        "include.text",
        archivedUserData.count
      );

      cy.get(".css-q34dxg")
        .eq(145)
        .invoke("css", "border", "2px solid red")
        .should("include.text", archivedUserData.results[0].first_name)
        .wait(10)
        .invoke("css", "border", "none");
      cy.get(".css-q34dxg")
        .eq(146)
        .invoke("css", "border", "2px solid red")
        .should("include.text", archivedUserData.results[0].email)
        .wait(10)
        .invoke("css", "border", "none");
      cy.get(".css-q34dxg")
        .eq(147)
        .invoke("css", "border", "2px solid red")
        .should("include.text", archivedUserData.results[0].status)
        .wait(10)
        .invoke("css", "border", "none");
      cy.get(".css-q34dxg")
        .eq(148)
        .invoke("css", "border", "2px solid red")
        .should(
          "include.text",
          archivedUserData.results[0]?.role?.name || "---"
        )
        .wait(10)
        .invoke("css", "border", "none");
      cy.get(".css-q34dxg")
        .eq(149)
        .contains(archivedUserData.results[0]?.group?.name || "---")
        .invoke("css", "border", "2px solid red")
        .wait(10)
        .should(
          "include.text",
          archivedUserData.results[0]?.group?.name || "---"
        )
        .invoke("css", "border", "none");
      cy.get(".css-q34dxg")
        .eq(150)
        .contains(archivedUserData.results[0]?.group?.name || "---")
        .invoke("css", "border", "2px solid red")
        .wait(10)
        .should(
          "include.text",
          archivedUserData.results[0]?.assigned_vehicles?.name || "---"
        )
        .invoke("css", "border", "none");
    });
    cy.get(".css-1q2h7u5").eq(0).click();
  });
});
