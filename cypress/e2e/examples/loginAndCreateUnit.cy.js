describe("Login and create unit", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1700, 1200);
  });

  it("should login and verify title on production page", () => {
    cy.loginWith(email, password);

    cy.url({ timeout: 30000 }).should("include", "/units?page=1");

    cy.wait(2000);
    // cy.buttonClick(".ModalOptions_blockFiltering__jpAKN");
    // cy.get(".ModalOptions_blockFiltering__jpAKN").click();
    cy.contains(".ModalOptions_blockFiltering__jpAKN", "Vehicle Group").click();
    cy.wait(1000);
    cy.buttonClick(
      ".ModalOptions_blockFiltering__trueModal__inModal__paddingModal__listItem__-6JIk:first-child"
    );
    cy.contains("button[type='button']", "Apply").click();

    cy.contains(".ModalOptions_blockFiltering__jpAKN", "Vehicle Group").click();
    cy.wait(1000);
    cy.buttonClick(
      ".ModalOptions_blockFiltering__trueModal__inModal__paddingModal__listItem__-6JIk:nth-child(5)"
    );
    cy.contains("button[type='button']", "Apply").click();

    for (let i = 0; i < 5; i++) {
      cy.contains(
        ".ModalOptions_blockFiltering__jpAKN",
        "Vehicle Group"
      ).click();
      cy.wait(1000);
      cy.buttonClick(
        `.ModalOptions_blockFiltering__trueModal__inModal__paddingModal__listItem__-6JIk:nth-child(${
          i + 2
        })`
      );
      cy.contains("button[type='button']", "Apply").click();
    }

    // // debugger;
    // cy.contains(
    //   ".VehicleDashboard_vehicle_dashboard__buttons__J-w4y",
    //   "Add Unit"
    // )
    //   .should("be.visible")
    //   .click();

    // cy.url({ timeout: 30000 }).should("include", "/create-unit");

    // cy.get('[name="name"]').type("FAKE UNIT NAME");
    // cy.get('[name="vin_sn"]').type("1231231321232");
    // cy.get('[name="license_plate"]').type("IL-TRK121232");
    // cy.get('[name="year"]').type("2025");

    // cy.wait(2000);

    // cy.contains("button", "Save").should("be.visible").click();

    // cy.contains(".Toastify__toast-body", "Success!", { timeout: 30000 }).should(
    //   "be.visible"
    // );

    // cy.wait(2000);

    // cy.contains(".css-q34dxg", "FAKE UNIT NAME").should("be.visible"); // .click(); если хотите увидеть подробную информацию
  });
});
