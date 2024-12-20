describe("Login and create unit", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  const timeout = { timeout: 50000 };
  // const interceptEndpoints = () => {
  //   cy.intercept("GET", "/api/v1/vehicles/?offset=0&limit=10").as(
  //     "unitsRequest"
  //   );
  //   cy.intercept("GET", "/api/v1/dashboard/analytics/complete/").as(
  //     "completeRequest"
  //   );
  //   cy.intercept(
  //     "GET",
  //     "/api/v1/accounts/contacts/?enable_fleetio_access=true&offset=0&limit=10"
  //   ).as("contactsRequest");
  //   cy.intercept(
  //     "GET",
  //     "/api/v1/accounts/contacts/?enable_fleetio_access=true&status=active&offset=0&limit=10"
  //   ).as("activeContactsRequest");
  //   cy.intercept(
  //     "GET",
  //     "/api/v1/accounts/contacts/?enable_fleetio_access=true&status=archived&offset=0&limit=10"
  //   ).as("archivedContactsRequest");
  //   cy.intercept(
  //     "GET",
  //     "/api/v1/accounts/contacts/?enable_fleetio_access=true&status=inactive&offset=0&limit=10"
  //   ).as("inactiveContactsRequest");
  // };

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1900, 1280);
    // interceptEndpoints();
  });

  it("should create issues on production", () => {
    // Login and verify URL
    cy.loginWith(email, password);

    // Navigate to issues page
    cy.get(".Sidebar_sidebar__section__fNoEs", timeout).eq(1).click();
    cy.get(".Sidebar_sidebarItem__2s00-", timeout).eq(11).click();
    cy.get(".Sidebar_sidebarItem__popup_item__8NCQT", timeout).eq(0).click();
    cy.url(timeout).should("include", "/issues");
    cy.wait(2500);
    cy.get(".css-1yxmbwk", { timeout: 30000 }).click();

    // FILLING THE FORM

    for (let i = 0; i < 5; i++) {
      cy.get(".css-19bb58m", { timeout: 30000 }).eq(i).click();
      cy.get(".css-p7gue6-option", { timeout: 30000 })
        .eq(Math.floor(Math.random() * 4))
        .click();
    }
    cy.intercept("POST", "/api/v1/issues/create/").as("createIssues");

    cy.get(".css-mnn31", { timeout: 30000 })
      .eq(2)
      .type(`Tire pressure issue #${Math.floor(Math.random() * 1000)}`);
    cy.get(".css-10oer18")
      .eq(0)
      .type(`Description#${Math.floor(Math.random() * 1000)}`);
    cy.get('button[type="submit"]').click();
    cy.wait(2500);

    // ADD TO NEW ISSUE
    cy.get(".css-1liixou", { timeout: 30000 }).eq(0).click();

    // CHOOSING A UNIT
    cy.get(".css-1liixou", timeout).eq(0).click();

    // DETAIL INFORMATION
    cy.get(".IssueStatus_status__solve__QTQRL", timeout).click();

    // RESOLVE ISSUES FROM DETAIL INFORMATION
    cy.get(".IssueStatus_status__solve__modal__item__Yj1C6", {
      timeout: 30000,
    })
      .eq(1)
      .click();
    cy.get(".css-10oer18")
      .eq(2)
      .type(`Resolve description#${Math.floor(Math.random() * 1000)}`);
    cy.get(".css-1hw9j7s", { timeout: 50000 }).eq(1).click();

    cy.wait(3000);

    // REOPEN ISSUES
    cy.get(".IconButton_open_block_cont__HN7q1", {
      timeout: 50000,
    }).click({ timeout: 50000 });
    cy.get(".css-1hw9j7s", { timeout: 50000 }).eq(2).click();
    cy.wait(2500);

    //ADD TO WORK_ORDER
    cy.get(".IssueStatus_status__solve__QTQRL", timeout).click(timeout);
    cy.wait(1000);
    cy.contains("Add to Work Order", timeout)
      .should("be.visible", timeout)
      .click(timeout);

    cy.wait(3000);

    for (let j = 2; j < 7; j++) {
      cy.get(".css-19bb58m", timeout).eq(j).click();
      cy.get(".css-p7gue6-option", timeout)
        .eq(Math.floor(Math.random() * 3))
        .click();
    }
    cy.get(".css-19bb58m", timeout).eq(7).click();
    cy.get(".css-14ze5ko-option")
      .eq(Math.floor(Math.random() * 5))
      .click();

    cy.get(".css-mnn31")
      .eq(10)
      .type(Math.floor(Math.random() * 20));

    cy.get(".css-mnn31")
      .eq(11)
      .type(Math.floor(500 + Math.floor(Math.random() * 2000)));

    // ADD LABOR TO WORK ORDER
    cy.get(".css-1q2h7u5").eq(4).click();
    cy.get(".css-1rs06yn").eq(0).click();
    cy.get(".css-14ze5ko-option")
      .eq(Math.floor(Math.random() * 5))
      .click();

    cy.get(".css-mnn31")
      .eq(12)
      .type(Math.floor(Math.random() * 10));
    cy.get(".css-mnn31")
      .eq(13)
      .type(Math.floor(Math.floor(Math.random() * 100)));

    cy.get(".css-19bb58m").eq(11).click();
    cy.get(".css-12dyb37-menu").click();
    cy.get(".css-1hw9j7s").eq(3).click();

    cy.get(".css-1hw9j7s").eq(1).click();
    // cy.wait(10000);
    // CHECKING ALL FIELDS IN WORK ORDER
  });
});
