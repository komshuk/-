describe("login page", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("should show the main page", () => {
      cy.contains("Books list").should("be.visible");
    });
  
    it("login successfully", () => {
      cy.login("test@test.com", "test");
  
      cy.contains("Добро пожаловать test@test.com").should("be.visible");
      cy.contains("Log out").should("be.visible");
    });
  
    it("login unsuccessfully (spelling error in the text 'Неправильая')", () => {
      cy.login("test@test.com", "test1");
  
      cy.contains("Неправильая почта или пароль").should("be.visible");
    });
  
    it("logins error on empty login", () => {
      cy.login(null, "test");
      cy.get("#mail")
        .then((el) => {
          return el[0].checkValidity();
        })
        .should("be.false");
    });
  
    it("logins error on empty password", () => {
      cy.login("test@test.com", null);
      cy.get("#pass").then((el) => {
        expect(el[0].checkValidity()).to.be.false;
        expect(el[0].validationMessage).to.be.eql("Заполните это поле.");
      });
    });
  });
  
  describe("favorites page", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.login("test@test.com", "test");
      cy.contains("Добро пожаловать test@test.com").should("be.visible");
    });
  
    it("adding books to favorites", () => {
      cy.addBook(
        "Преступление и наказание",
        "Роман Ф. М. Достоевского «Преступление и наказание» издается с предисловием К. Степаняна и комментариями.",
        "Федор Достоевский"
      );
      cy.get("#fileCover").attachFile("prestuplenie-i-nakazanie.jpg");
      cy.get("#fileBook").attachFile("prestuplenie-i-nakazanie.epub");
      cy.get("#favorite").click();
      cy.contains("Submit").click();
    });
  
    it("show the favorite book and download file", () => {
      cy.contains("Favorites").click();
      cy.contains(".card-title", "Преступление и наказание").first().click();
      cy.contains("Dowload book").click(); //ошибка в тексте download
    });
  
    it("show the favorite book and delete from favorites", () => {
      cy.contains("Favorites").click();
      cy.contains(".card-title", "Преступление и наказание")
        .parents(".card")
        .find("button:contains('Delete from favorite')")
        .click(); 
    });
  });