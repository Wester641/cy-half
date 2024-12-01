describe("Login and Redirect Test To Units Page", () => {
  const loginData = {
    email: "zafarzhon77@gmail.com",
    password: "zafarzhon77",
  };

  beforeEach(() => {
    cy.viewport(1600, 1200);
  });

  it("should login via API and redirect to units page", () => {
    cy.request("POST", "/api/v1/accounts/login/", loginData).then(
      (response) => {
        expect(response.status).to.eq(200);

        const token = response.body.token;
        console.log(token);
        cy.setCookie("access_token", token);

        cy.visit("/units?page=1");

        cy.url().should("include", "/units?page=1");
        // cy.get("h1").should("contain", "Units");

      }
    );
  });
});
