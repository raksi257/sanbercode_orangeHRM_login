class loginPage {
  masukHalaman() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
  }
  masukUsername(usernamevalid) {
    cy.get('input[name="username"]').type(usernamevalid);
  }
  Usernamesalah(usernameinvalid) {
    cy.get('input[name="username"]').type(usernameinvalid);
  }
  masukPasssword(passwordvalid) {
    cy.get('input[name="password"]').type(passwordvalid);
  }
  Passswordsalah(passwordinvalid) {
    cy.get('input[name="password"]').type(passwordinvalid);
  }
  clickLogin() {
    cy.get('button[type="submit"]').click();
  }
  verifikasiLink() {
    cy.get(".oxd-topbar-header-title").should("contain", "Dashboard");
  }
  invlidCredentials() {
    cy.get(".oxd-alert-content-text")
      .should("be.visible")
      .and("contain", "Invalid credentials");
  }
  required() {
    cy.get(".oxd-input-group__message")
      .should("be.visible")
      .and("contain", "Required");
  }
}
export default new loginPage();
