// import { URLs } from "../../../../constants/links";
// import { Selectors } from "./Selectors";

// describe("Test delete user", () => {
//   const email = Cypress.env("email");
//   const password = Cypress.env("password");
//   beforeEach(() => {
//     cy.visit("/");
//     cy.loginWith(email, password);
//     cy.url().should("include", URLs.units);
//   });

//   it("should delete user", () => {
//     cy.visit(URLs.users);
//     cy.intercept("DELETE", URLs.api.deleteUser).as("DeleteUser");
//     cy.get(Selectors.threeDotsMenu).eq(1).click();
//     cy.get(Selectors.deleteOption).eq(1).click();
//     cy.get(Selectors.confirmDelete).eq(1).click();
//     cy.wait("@DeleteUser").then((interception) => {
//       expect([200, 201, 204]).to.include(interception.response.statusCode);
//     });
//   });
// });
