describe("Login and Redirect Test", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1700, 1300);
  });

  it("should create units and verify title on production page", () => {
    cy.get('input[type="text"]').type(email);
    cy.get('input[type="password"]').type(password);

    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 30000 }).should("include", `/units`);

    cy.wait(2000);

    cy.contains("TTruck")
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
    // cy.get('[name="name"]')
    //   .focus()
    //   .type(`TTruck #${Math.floor(Math.random() * 10000).toFixed()}`);
    // cy.get('[name="vin_sn"]')
    //   .focus()
    //   .type(`56789${Math.floor(Math.random() * 100000).toFixed()}`);
  });
});
