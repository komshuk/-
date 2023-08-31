Cypress.Commands.add("deleteCommand", (username) => {
    cy.request({
      url: `/${username}`,
      method: "DELETE",
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status == 200) {
        expect(response.body).to.be.eql({
          code: 200,
          type: "unknown",
          message: username,
        });
      } else {
        expect(response.status).to.eq(404);
      }
    });
  });
  
  Cypress.Commands.add("createCommand", (bodyUser) => {
    cy.request({
      url: "/",
      method: "POST",
      body: bodyUser,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.be.eql(String(bodyUser.id));
    });
  });
  
  Cypress.Commands.add("updateCommand", (updatedUser, path) => {
    cy.request({
      url: `/${path}`,
      method: "PUT",
      body: updatedUser,
    }).then((response) => {
      if (response.status == 200) {
        expect(response.body.code).to.eq(200);
      } else {
        expect(response.status).to.eq(404);
      }
    });
  });