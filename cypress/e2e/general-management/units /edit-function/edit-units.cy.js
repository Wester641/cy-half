describe("Editing Unit by ID", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

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

  beforeEach(() => {
    cy.visit("/");
  });

  it("should check and edit unit by id", () => {
    cy.loginWith(email, password);

    cy.intercept("GET", "/api/v1/vehicles/**/").as("getDataUnitDetailById"); // getting data from API, for edit unit

    cy.get('button[type="submit"]').click();
    cy.url().should("include", `/units`);

    cy.wait(2000);
    cy.contains(".css-q34dxg", "Truck").should("be.visible").click();

    cy.url().should("include", `https://app.easyfleet.ai/units/`);

    cy.wait(2500);

    cy.contains(".IconButton_open_block_cont__HN7q1", "Edit")
      .should("be.visible")
      .click();

    cy.url().should("include", "/units/update/");

    cy.wait("@getDataUnitDetailById").then((interception) => {
      expect([200, 201]).to.include(interception.response.statusCode);
      cy.wait(2500);
      const unitsDetail = interception?.response?.body;
      console.log(unitsDetail);

      const selectCheck = [
        { index: 0, value: unitsDetail.type.name },
        { index: 1, value: unitsDetail.fuel_type.name },
        { index: 2, value: unitsDetail.make.name },
        { index: 3, value: unitsDetail.model.name },
        { index: 4, value: unitsDetail.status },
        { index: 5, value: unitsDetail.group.name },
        { index: 6, value: unitsDetail.operator.first_name },
        { index: 7, value: unitsDetail.ownership },
        { index: 8, value: unitsDetail.body_type.name },
        { index: 9, value: unitsDetail.body_subtype.name },
        { index: 10, value: unitsDetail.linked_vehicles[0].name },
      ];
      selectCheck.forEach(({ value }) => {
        cy.log(value);
      });
    });

    //  CHANGING ANOTHER VALUE AND EDIT

    // Select random values
    for (let i = 0; i < 12; i++) {
      cy.get(".react-select__input-container")
        .eq(i)
        .should("be.visible")
        .click();
      cy.get(".css-p7gue6-option")
        .eq(`${Math.floor(Math.random() * 3)}`)
        .should("be.visible")
        .click();
    }

    cy.wait(2500);

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

    cy.wait(2500);

    cy.intercept("PATCH", "/api/v1/vehicles/**/update/").as("editUnitRequest");
    cy.contains("button", "Save").should("be.visible").click();

    cy.wait("@editUnitRequest").then((interception) => {
      console.log(interception);
      expect([200, 201]).to.include(interception.response.statusCode);
    });

    cy.contains(".Toastify__toast-body", "Success!").should("be.visible");
  });
});
