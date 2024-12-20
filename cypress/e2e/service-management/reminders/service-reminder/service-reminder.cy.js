describe("Login and create unit", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  const timeout = { timeout: 50000 };

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1900, 1280);
  });

  it("should create service-reminder on production", () => {
    // Login and verify URL
    cy.loginWith(email, password);

    // Navigate to service-remidner page and create
    cy.get(".Sidebar_sidebar__section__fNoEs", timeout).eq(1).click();
    cy.get(".Sidebar_sidebarItem__2s00-", timeout).eq(13).click();
    cy.get(".Sidebar_sidebarItem__popup_item__8NCQT", timeout).eq(2).click();
    cy.url(timeout).should("include", "/reminders/services");
    cy.wait(2500);
    cy.get(".IconButton_label_block__label__8Lj0h", timeout).click();

    // FILLING THE FORM
    cy.intercept("POST", "/api/v1/reminders/service_reminders/create/").as(
      "createReminder"
    );
    for (let i = 0; i < 2; i++) {
      cy.get(".css-19bb58m", timeout).eq(i).click(timeout);
      cy.get(".css-p7gue6-option")
        .eq(Math.floor(Math.random() * 6))
        .click();
      cy.wait(2000);
    }
    cy.get(".css-19bb58m", timeout).eq(2).click(timeout);
    cy.get(".css-p7gue6-option")
      .eq(Math.floor(Math.random() * 3))
      .click();

    cy.get(".css-19bb58m", timeout).eq(3).click(timeout);
    cy.get(".css-p7gue6-option").eq(0).click();
    for (let k = 0; k < 2; k++) {
      cy.get(".css-mnn31", timeout).eq(k).type("1");
    }

    cy.get(".css-mnn31", timeout).eq(2).type("20000");
    cy.get(".css-mnn31", timeout).eq(3).type("1000");
    cy.get("button[type='submit']", timeout).click();
    cy.wait("@createReminder").then((interception) => {
      expect([200, 201, 204]).to.include(interception.response.statusCode);
    });
    cy.wait(2000);
  });
});
