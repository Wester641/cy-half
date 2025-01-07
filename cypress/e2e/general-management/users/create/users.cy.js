describe("CRUD in users section", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  beforeEach(() => {
    cy.visit("/");
  });

  // CREATE USER
  it("should create user with example data", () => {
    cy.intercept("GET", "/api/v1/vehicles/?offset=0&limit=10").as(
      "unitsRequest"
    );
    cy.intercept("GET", "/api/v1/dashboard/analytics/complete/").as(
      "CompleteRequest"
    );

    cy.loginWith(email, password);
    cy.url().should("include", "/units");
    cy.visit("/users");

    cy.intercept(
      "GET",
      "/api/v1/accounts/contacts/?enable_fleetio_access=true&offset=0&limit=10"
    ).as("Contacts");

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
    cy.get(".css-mnn31")
      .eq(0)
      .clear()
      .eq(0)
      .type(`User${Math.floor(Math.random() * 1000)}`);

    cy.get(".css-mnn31")
      .eq(3)
      .type(`example${Math.floor(Math.random() * 1000)}@example.com`);
    cy.get(".css-19bb58m").eq(1).click();
    cy.get(".css-p7gue6-option")
      .eq(Math.floor(Math.random() * 3))
      .click();
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
    cy.wait(3000);
    cy.get(".css-q34dxg").eq(1).click();
    cy.wait(3000);
    cy.visit("/users");
    cy.wait(3000);
  });

  // EDIT CREATED USER
  it("should edit created users in the first of list", () => {
    cy.loginWith(email, password);
    cy.url().should("include", `/units`);

    cy.visit("/users");
    cy.get(".css-1yxmbwk").eq(1).click();
    cy.get(".css-1km1ehz").eq(0).click();

    cy.url().should("include", "/users/update/");
    cy.intercept("PATCH", "/api/v1/accounts/contacts/**/update/").as(
      "UpdateUser"
    );
    cy.intercept("GET", "/api/v1/accounts/contacts/**/").as("UserDetails");
    cy.get(".css-mnn31")
      .eq(0)
      .invoke("val")
      .then((nameUser) => {
        cy.get(".css-mnn31")
          .eq(0)
          .clear()
          .type("Edited" + nameUser);
      });

    cy.get(".css-mnn31")
      .eq(3)
      .clear()
      .type(`edited${Math.floor(Math.random() * 1000)}@example.com`);
    cy.get(".css-19bb58m").eq(1).click();
    cy.get(".css-12dyb37-menu").click();
    cy.get('button[type="submit"]').click();
    cy.wait("@UpdateUser").then((interception) => {
      expect([200, 201, 204]).to.include(interception.response.statusCode);
    });
    cy.wait("@UserDetails").its("response.statusCode").should("eq", 200);

    cy.url().should("include", "/users/");
    cy.visit("/users");
    cy.wait(3000);
  });

  // REMOVE EDITED USER
  it("should remove edited users in the first of list", () => {
    cy.loginWith(email, password);
    cy.url().should("include", `/units`);
    cy.visit("/users");
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

describe("CRUD in users section", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  beforeEach(() => {
    cy.visit("/");
  });

  // CREATE USER
  it("should create user with example data", () => {
    cy.intercept("GET", "/api/v1/vehicles/?offset=0&limit=10").as(
      "unitsRequest"
    );
    cy.intercept("GET", "/api/v1/dashboard/analytics/complete/").as(
      "CompleteRequest"
    );

    cy.loginWith(email, password);
    cy.url().should("include", "/units");
    cy.visit("/users");

    cy.intercept(
      "GET",
      "/api/v1/accounts/contacts/?enable_fleetio_access=true&offset=0&limit=10"
    ).as("Contacts");

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
    cy.get(".css-mnn31")
      .eq(0)
      .clear()
      .eq(0)
      .type(`User${Math.floor(Math.random() * 1000)}`);

    cy.get(".css-mnn31")
      .eq(3)
      .type(`example${Math.floor(Math.random() * 1000)}@example.com`);
    cy.get(".css-19bb58m").eq(1).click();
    cy.get(".css-p7gue6-option")
      .eq(Math.floor(Math.random() * 3))
      .click();
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
    cy.wait(3000);
    cy.get(".css-q34dxg").eq(1).click();
    cy.wait(3000);
    cy.visit("/users");
    cy.wait(3000);
  });

  // EDIT CREATED USER
  it("should edit created users in the first of list", () => {
    cy.loginWith(email, password);
    cy.url().should("include", `/units`);

    cy.visit("/users");
    cy.get(".css-1yxmbwk").eq(1).click();
    cy.get(".css-1km1ehz").eq(0).click();

    cy.url().should("include", "/users/update/");
    cy.intercept("PATCH", "/api/v1/accounts/contacts/**/update/").as(
      "UpdateUser"
    );
    cy.intercept("GET", "/api/v1/accounts/contacts/**/").as("UserDetails");
    cy.get(".css-mnn31")
      .eq(0)
      .invoke("val")
      .then((nameUser) => {
        cy.get(".css-mnn31")
          .eq(0)
          .clear()
          .type("Edited" + nameUser);
      });

    cy.get(".css-mnn31")
      .eq(3)
      .clear()
      .type(`edited${Math.floor(Math.random() * 1000)}@example.com`);
    cy.get(".css-19bb58m").eq(1).click();
    cy.get(".css-12dyb37-menu").click();
    cy.get('button[type="submit"]').click();
    cy.wait("@UpdateUser").then((interception) => {
      expect([200, 201, 204]).to.include(interception.response.statusCode);
    });
    cy.wait("@UserDetails").its("response.statusCode").should("eq", 200);
    cy.url().should("include", "/users/");
  });

  // REMOVE EDITED USER
  it("should remove edited users in the first of list", () => {
    cy.loginWith(email, password);
    cy.url().should("include", `/units`);
    cy.visit("/users");
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
