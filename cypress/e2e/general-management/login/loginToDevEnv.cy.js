// describe("Login and Redirect Test To Units Page", () => {
//   const email = "zafarzhon77@gmail.com";
//   const password = "zafarzhon77";

//   beforeEach(() => {
//     cy.visit("https://dev-app.easyfleet.ai/login", { timeout: 10000 });
//     // cy.viewport(1920, 1200);
//   });

//   it("should login and verify title on production page", () => {
//     cy.intercept("POST", "/api/v1/accounts/login/").as("loginRequest");
//     cy.loginWith(email, password);
//     cy.wait("@loginRequest", { timeout: 10000 }).then((interception) => {
//       expect([200, 201, 204]).to.include(interception.response.statusCode);
//     });
//     cy.url({ timeout: 10000 }).should("include", "/units");
//   });
// });
