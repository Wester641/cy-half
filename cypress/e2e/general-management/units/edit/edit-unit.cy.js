import { URLs } from "../../../../constants/links";
import {
  Selectors,
  truckColors,
  stateRegistration,
  trimTrucks,
} from "./Selectors";

describe("Test edit function", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should edit unit", () => {
    cy.loginWith(email, password);

    cy.url().should("include", URLs.units);

    cy.wait(2000);
    cy.contains(Selectors.threeDotsMenu, "Truck")
      .should(Selectors.beVisible)
      .click();

    cy.url().should("include", URLs.units);

    cy.wait(2500);

    cy.contains(Selectors.editButton, "Edit")
      .should(Selectors.beVisible)
      .click();

    cy.url().should("include", URLs.updateUnit);

    for (let i = 0; i < 12; i++) {
      cy.get(Selectors.selectContainer)
        .eq(i)
        .should(Selectors.beVisible)
        .click();
      cy.get(Selectors.selectOption)
        .eq(`${Math.floor(Math.random() * 3)}`)
        .should(Selectors.beVisible)
        .click();
    }

    cy.wait(2500);

    cy.get(Selectors.input)
      .eq(4)
      .should(Selectors.beVisible)
      .type(trimTrucks[Math.floor(Math.random() * trimTrucks.length)]);
    cy.get(Selectors.input)
      .eq(5)
      .should(Selectors.beVisible)
      .type(
        stateRegistration[Math.floor(Math.random() * stateRegistration.length)]
      );
    cy.get(Selectors.input)
      .eq(6)
      .should(Selectors.beVisible)
      .type(truckColors[Math.floor(Math.random() * truckColors.length)]);

    cy.wait(2500);

    cy.intercept("PATCH", URLs.api.editUnit).as("editUnitRequest");
    cy.contains(Selectors.button, "Save").should(Selectors.beVisible).click();

    cy.wait("@editUnitRequest").then((interception) => {
      console.log(interception);
      expect([200, 201]).to.include(interception.response.statusCode);
    });

    cy.contains(Selectors.toastifySuccess, "Success!").should(
      Selectors.beVisible
    );
  });
});
