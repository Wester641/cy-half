describe("Login and Redirect Test", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1920, 1080);
  });

  it("should create units and verify title on production page", () => {
    cy.get('input[type="text"]').type(email);
    cy.get('input[type="password"]').type(password);

    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 30000 }).should("include", `/units?page=1`);

    // cy.wait(2000);

    // cy.contains("TTruck")
    //   .should("be.visible")
    //   .then(() => {
    //     cy.intercept("POST", "/api/v1/vehicles/*/archive/").as(
    //       "deleteUnitRequest"
    //     );

    //     cy.get(".css-q34dxg").eq(9).click();
    //     cy.get(".css-1km1ehz").eq(1).click();

    //     cy.wait("@deleteUnitRequest").then((interception) => {
    //       console.log(interception);
    //       expect([200, 201, 204]).to.include(interception.response.statusCode);
    //     });

    //     cy.contains('button[type="button"]', "Archived")
    //       .should("be.visible")
    //       .click();
    //     cy.url({ timeout: 30000 }).should(
    //       "include",
    //       "/units?page=1&filter=is_archived"
    //     );

    //     cy.wait(2000);

    //     cy.get(".css-q34dxg").eq(0).should("be.visible");
    //     cy.get(".css-q34dxg").eq(9).click();
    //     // cy.contains("Unarchive").click();
    //   });

    cy.contains('button[type="button"]', "Archived")
      .should("be.visible")
      .click()
      .wait(2000);
    cy.url({ timeout: 30000 }).should(
      "include",
      "/units?page=1&filter=is_archived"
    );

    // cy.wait(2000);

    // cy.contains("TTruck").eq(2).should("be.visible");

    cy.get(
      ":nth-child(4) > .VehicleList_vehicle_list__3u8+a > .Table_container__XFth8 > .Table_tableWrapper__ePlzX > .MuiTable-root > .MuiTableBody-root > :nth-child(1) > :nth-child(10) > div > .MuiButtonBase-root"
    ).then((button) => {
      if (!button) {
        // cy.contains(".", "All");
        cy.get(".MuiTabs-flexContainer > :nth-child(1)")
          .should("be.visible")
          .click();
        cy.wait(2000);
        cy.contains('button[type="button"]', "Archived")
          .should("be.visible")
          .click()
          .wait(2000);
        cy.url({ timeout: 30000 }).should(
          "include",
          "/units?page=1&filter=is_archived"
        );
      } else {
        // cy.get(
        //   ":nth-child(4) > .VehicleList_vehicle_list__3u8+a > .Table_container__XFth8 > .Table_tableWrapper__ePlzX > .MuiTable-root > .MuiTableBody-root > :nth-child(1) > :nth-child(10) > div > .MuiButtonBase-root"
        // ).should("be.visible");
      }
    });
    //   cy.get(".css-q34dxg")
    //     .contains("TTruck")
    //     .should("be.visible")
    //     .then(() => {
    //       cy.wait(2000);
    //       cy.get(".css-q34dxg").eq(9).click();
    //       cy.contains("Unarchive").click();
    //     });
    // });

    // cy.get('[name="name"]')
    //   .focus()
    //   .type(`TTruck #${Math.floor(Math.random() * 10000).toFixed()}`);
    // cy.get('[name="vin_sn"]')
    //   .focus()
    //   .type(`56789${Math.floor(Math.random() * 100000).toFixed()}`);
  });
});
