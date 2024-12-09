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

  it("should check and edit unit by id", () => {
    cy.loginEnter(email, password);
    cy.intercept("GET", "/api/v1/vehicles/**/").as("getDataUnitDetailById"); // getting data from API, for edit unit

    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 30000 }).should("include", `/units`);

    cy.wait(2000);
    cy.contains(".css-q34dxg", "TTruck").should("be.visible").click();

    cy.url({ timeout: 30000 }).should(
      "include",
      `https://app.easyfleet.ai/units/`
    );

    cy.wait(2500);

    cy.contains(".IconButton_open_block_cont__HN7q1", "Edit")
      .should("be.visible")
      .click();

    // cy.wait(2000);

    cy.url({ timeout: 30000 }).should("include", "/units/update/");

    cy.wait("@getDataUnitDetailById").then((interception) => {
      expect([200, 201]).to.include(interception.response.statusCode);
      cy.wait(2500);
      const unitsDetail = interception?.response?.body;
      console.log(unitsDetail);
      // cy.get('[name="name"]').should("have.value", unitsDetail.name);
      // cy.get('[name="vin_sn"]').should("have.value", unitsDetail.vin_sn);
      // cy.get('[name="license_plate"]').should(
      //   "have.value",
      //   unitsDetail.license_plate
      // );
      // cy.get('[name="year"]').should("have.value", unitsDetail.year);
      // cy.get(".css-mnn31").eq(4).should("have.value", unitsDetail.trim);
      // cy.get(".css-mnn31")
      //   .eq(5)
      //   .should("have.value", unitsDetail.registration_state_province);
      // cy.get(".css-mnn31").eq(6).should("have.value", unitsDetail.color);
      // cy.get(".css-mnn31").eq(7).should("have.value", unitsDetail.msrp);

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
    // cy.get(".css-mnn31")
    //   .eq(7)
    //   .should("be.visible")
    //   .type(
    //     truckMsrpRanges[Math.floor(Math.random() * truckMsrpRanges.length)]
    //   );
    // cy.reload();
    cy.intercept("PATCH", "/api/v1/vehicles/**/update/").as("editUnitRequest");
    cy.contains("button", "Save").should("be.visible").click();

    cy.wait("@editUnitRequest").then((interception) => {
      console.log(interception);
      expect([200, 201]).to.include(interception.response.statusCode);
    });

    cy.contains(".Toastify__toast-body", "Success!", { timeout: 30000 }).should(
      "be.visible"
    );

    // cy.wait(2000)
    // cy.contains(".css-q34dxg", "FAKE UNIT NAME").should("be.visible"); // .click(); если хотите увидеть подробную информацию
  });
});
