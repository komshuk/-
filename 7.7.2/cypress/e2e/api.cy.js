import username from "../fixtures/username.json";

describe("petstore api", () => {
  it("log in user", () => {
    cy.request(
      `/login?username=${username.user1.username}&password=${username.user1.password}`
    ).then((response) => {
      expect(response.status).to.be.eql(200);
    });
  });

  it("create user", () => {
    cy.createCommand(username.user1);
  });

  it("create another user", () => {
    cy.createCommand(username.user2);
  });

  it("update user", () => {
    cy.updateCommand(username.updatedUser2, "username2");
  });

  it("update not existed user", () => {
    cy.updateCommand(username.notExistedUser, "username3");
  });

  it("delete user", () => {
    cy.deleteCommand("username1");
  });

  it("delete not existed user", () => {
    cy.deleteCommand("username3");
  });
});