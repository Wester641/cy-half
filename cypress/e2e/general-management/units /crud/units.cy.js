describe("Create Unit and Edit Unit, Delete Unit", () => {
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
  });

  it("should create unit and visit to unit-detail page", () => {
    cy.loginWith(email, password);

    cy.url().should("include", `/units`);

    cy.visit("/create-unit");

    cy.wait(2000);

    cy.url().should("include", "/create-unit");

    cy.get('[name="name"]')
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

    cy.contains(".Toastify__toast-body", "Success!").should("be.visible");
    cy.wait(5000);
    cy.get(".css-q34dxg").eq(1).should("be.visible").click();
    cy.wait(5000);
  });

  // EDIT UNIT
  it("should find unit and edit", () => {
    cy.loginWith(email, password);

    cy.url().should("include", `/units`);
    cy.wait(2000);
    cy.get(".css-q34dxg").eq(1).should("be.visible").click();
    cy.wait(2000);
    cy.get(".css-1yxmbwk").eq(0).should("be.visible").click();
    cy.wait(2000);
    cy.get('[name="name"]')
      .invoke("val")
      .then((name) => {
        const updatedName = name.slice(0, -2);
        cy.get('[name="name"]')
          .clear()
          .type(updatedName + "33");
      });
    cy.contains("button", "Save").should("be.visible").click();
    cy.wait(5000);
    cy.get(".css-q34dxg").eq(1).should("be.visible").click();
    cy.wait(5000);
  });

  // DELETE UNIT
  it("should find unit and delete", () => {
    cy.loginWith(email, password);

    cy.url().should("include", `/units`);

    cy.wait(2000);

    cy.get(".css-1yxmbwk")
      .eq(1)
      .should("be.visible")
      .then((truck) => {
        if (truck) {
          cy.intercept("DELETE", "/api/v1/vehicles/*/delete/").as(
            "deleteUnitRequest"
          );

          cy.get(".css-q34dxg").eq(9).click();
          cy.contains("Delete").click();
          cy.contains("Delete").click();

          cy.wait("@deleteUnitRequest").then((interception) => {
            console.log(interception);
            expect([200, 201, 204]).to.include(
              interception.response.statusCode
            );
          });
        }
      });
  });
});

