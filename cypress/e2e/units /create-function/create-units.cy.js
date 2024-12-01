describe("Login and Redirect Test", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  const stateRegistration = [
    "Illinois",
    "Indiana",
    "Wisconsin",
    "Iowa",
    "Missouri",
    "Michigan",
    "Ohio",
    "Minnesota",
    "Kentucky",
    "Michigan",
  ];
  const truckColors = [
    "White",
    "Black",
    "Silver",
    "Red",
    "Blue",
    "Gray",
    "Yellow",
    "Green",
    "Orange",
    "Brown",
  ];
  const trimTrucks = ["SE", "LE", "XLE"];
  const truckMsrpRanges = ["80000", "120000", "140000", "180000"];

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1700, 1300);
  });

  it("should create units and verify title on production page", () => {
    cy.get('input[type="text"]').type(email);
    cy.get('input[type="password"]').type(password);

    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 30000 }).should("include", `/units?page=1`);

    cy.contains(".IconButton_open_block_cont__HN7q1", "Add Unit")
      .should("be.visible")
      .click();

    cy.wait(2000);

    cy.url({ timeout: 30000 }).should(
      "include",
      "https://app.easyfleet.ai/create-unit"
    );

    cy.get('[name="name"]', { timeout: 30000 })
      .focus()
      .type(`TTruck #${Math.floor(Math.random() * 10000).toFixed()}`);
    cy.get('[name="vin_sn"]')
      .focus()
      .type(`56789${Math.floor(Math.random() * 100000).toFixed()}`);

    // Select random values
    for (let i = 0; i < 12; i++) {
      cy.get(".react-select__input-container")
        .eq(i)
        .should("be.visible")
        .click();
      cy.get(".css-p7gue6-option")
        .eq(`${Math.floor(Math.random() * 4)}`)
        .should("be.visible")
        .click();
    }
    cy.get('[name="license_plate"]')
      .focus()
      .type(`IL-TRK123${Math.floor(Math.random() * 10000).toFixed()}`);
    cy.get('[name="year"]').type(`${2000 + Math.floor(Math.random() * 26)}`);

    cy.get(".css-mnn31")
      .eq(4)
      .should("be.visible")
      .type(trimTrucks[Math.floor(Math.random() * trimTrucks.length)]);
    cy.get(".css-mnn31")
      .eq(5)
      .should("be.visible")
      .type(
        stateRegistration[Math.floor(Math.random() * stateRegistration.length)]
      );
    cy.get(".css-mnn31")
      .eq(6)
      .should("be.visible")
      .type(truckColors[Math.floor(Math.random() * truckColors.length)]);
    cy.get(".css-mnn31")
      .eq(7)
      .should("be.visible")
      .type(
        truckMsrpRanges[Math.floor(Math.random() * truckMsrpRanges.length)]
      );

    cy.wait(1000);

    cy.intercept("POST", "/api/v1/vehicles/create/").as("createUnitRequest");
    cy.contains("button", "Save").should("be.visible").click();

    cy.wait("@createUnitRequest").then((interception) => {
      console.log(interception);
      expect([200, 201]).to.include(interception.response.statusCode);
    });

    cy.contains(".Toastify__toast-body", "Success!", { timeout: 30000 }).should(
      "be.visible"
    );

    // cy.wait(2000
    // cy.contains(".css-q34dxg", "FAKE UNIT NAME").should("be.visible"); // .click(); если хотите увидеть подробную информацию
  });
});
