describe("Login and create unit", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1900, 1280);
  });

  it("should login and go to users page and create users, edit users and delete users on production", () => {
    cy.intercept("GET", "/api/v1/vehicles/?offset=0&limit=10").as(
      "unitsRequest"
    );
    cy.intercept("GET", "/api/v1/dashboard/analytics/complete/").as(
      "CompleteRequest"
    );

    cy.loginWith(email, password);
    cy.url({ timeout: 30000 }).should("include", "/units");
    cy.wait(1500);

    cy.intercept(
      "GET",
      "/api/v1/accounts/contacts/?enable_fleetio_access=true&offset=0&limit=10"
    ).as("Contacts");

    cy.get(".Sidebar_sidebarItem__2s00-").eq(2).should("be.visible").click();
    cy.get(".Sidebar_sidebarItem__popup__b7axi > :nth-child(1)").click();
    cy.url({ timeout: 30000 }).should("include", "/users");

    cy.wait("@Contacts").then((contacts) => {
      expect(contacts.response.statusCode).to.eq(200);
      const contactsData = contacts.response.body;
      cy.log(contactsData);

      cy.get(".UserDashboard_total__answer__QLmtn")
        .should("include.text", contactsData.count)
        .wait(500);
    });

    cy.intercept("POST", "/api/v1/accounts/contacts/create/").as("CreateUser");

    cy.get(".IconButton_label_block__label__8Lj0h").click();
    cy.get(".css-mnn31", { timeout: 30000 })
      .eq(0)
      .clear()
      .eq(0)
      .type(`User${Math.floor(Math.random() * 1000)}`);

    cy.get(".css-mnn31", { timeout: 30000 })
      .eq(3)
      .type(`example${Math.floor(Math.random() * 1000)}@example.com`);
    cy.get(".css-19bb58m").eq(1).click();
    cy.get(".css-12dyb37-menu").click();
    cy.get('button[type="submit"]').click();
    cy.wait("@CreateUser").then((interception) => {
      expect([200, 201, 204]).to.include(interception.response.statusCode);
    });
    cy.wait("@Contacts").then((contacts) => {
      expect(contacts.response.statusCode).to.eq(200);
      const contactsData = contacts.response.body;
      cy.log(contactsData);

      cy.get(".UserDashboard_total__answer__QLmtn")
        .should("include.text", contactsData.count)
        .wait(500);
      cy.get(".css-q34dxg")
        .eq(1)
        .should("include.text", contactsData.results[0].first_name);
      cy.get(".css-q34dxg")
        .eq(2)
        .should("include.text", contactsData.results[0].email);
      cy.get(".css-q34dxg")
        .eq(3)
        .should("include.text", contactsData.results[0].status);
      cy.get(".css-q34dxg")
        .eq(4)
        .should("include.text", contactsData.results[0].role?.name || "---");
      cy.get(".css-q34dxg")
        .eq(5)
        .should("include.text", contactsData.results[0].group?.name || "---");
      cy.get(".css-q34dxg")
        .eq(6)
        .should(
          "include.text",
          contactsData.results[0].assigned_vehicles?.name || "---"
        );
    });

    // EDIT USER
    cy.get(".css-1yxmbwk").eq(1).click();
    cy.get(".css-1km1ehz").eq(0).click();

    cy.url({ timeout: 50000 }).should("include", "/users/update/");
    cy.intercept("PATCH", "/api/v1/accounts/contacts/**/update/").as(
      "UpdateUser"
    );
    cy.intercept("GET", "/api/v1/accounts/contacts/**/").as("UserDetails");
    cy.get(".css-mnn31", { timeout: 30000 })
      .eq(0)
      .clear()
      .type(`EditedUser${Math.floor(Math.random() * 1000)}`);

    cy.get(".css-mnn31", { timeout: 30000 })
      .eq(3)
      .clear()
      .type(`EditedMail${Math.floor(Math.random() * 1000)}@example.com`);
    cy.get(".css-19bb58m").eq(1).click();
    cy.get(".css-12dyb37-menu").click();
    cy.get('button[type="submit"]').click();
    cy.wait("@UpdateUser").then((interception) => {
      expect([200, 201, 204]).to.include(interception.response.statusCode);
    });
    cy.wait("@UserDetails").its("response.statusCode").should("eq", 200);
    cy.url({ timeout: 50000 }).should("include", "/users/");

    // GO BACK, TO USERS PAGE
    cy.get(".MuiBreadcrumbs-li:nth-child(1)").click();

    // DELETE USER
    cy.intercept("DELETE", "/api/v1/accounts/contacts/**/delete/").as(
      "DeleteUser"
    );
    cy.get(".css-1yxmbwk").eq(1).click();
    cy.get(".css-1km1ehz").eq(1).click();
    cy.get(".css-1hw9j7s").eq(1).click();
    cy.wait("@DeleteUser").then((interception) => {
      expect([200, 201, 204]).to.include(interception.response.statusCode);
    });
  });
});
