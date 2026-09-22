describe("verifikasi fungsi login", () => {
  it("TC-001-Login dengan username valid password valid", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");

    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary",
    ).as("contohSummary");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-topbar-header-title").should("contain", "Dashboard");
    cy.wait("@contohSummary").its("response.statusCode").should("eq", 200);
  });
  it("TC-002-Login dengan username tidak valid password valid", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts",
    ).as("loginGagal");
    cy.get('input[name="username"]').should("be.visible").type("adminnnn");
    cy.get('input[name="password"]').should("be.visible").type("admin123");
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.get(".oxd-alert-content-text")
      .should("be.visible")
      .and("contain", "Invalid credentials");
    cy.wait(1000);
  });
  it("TC-003-Login dengan username valid password tidak valid", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get('input[name="username"]').type("admin");
    cy.get('input[name="password"]').type("admin12345");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-alert-content-text")
      .should("be.visible")
      .and("contain", "Invalid credentials");
  });
  it("TC-004-Login dengan username valid password valid dengan link lain", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts",
    ).as("shortcuts");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-topbar-header-title")
      .should("be.visible")
      .and("contain", "Dashboard");
    cy.wait("@shortcuts").its("response.statusCode").should("eq", 200);
  });
  it("TC-005-Login dengan username kosong password valid", () => {
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages",
    ).as("halamanAwal");
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get('input[name="username"]').should("be.visible").and("have.value", "");
    cy.get('input[name="password"]').should("be.visible").type("admin123");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-input-group__message")
      .should("be.visible")
      .and("contain", "Required");
    cy.wait("@halamanAwal").its("response.statusCode").should("eq", 200);
  });
  it("TC-006-Login dengan username valid password kosong", () => {
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages",
    ).as("halamanAwal");
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get('input[name="username"]').type("admin");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-input-group__message")
      .should("be.visible")
      .and("contain", "Required");
    cy.wait("@halamanAwal").its("response.statusCode").should("eq", 200);
  });
  it("TC-007-Login dengan username kosong password kosong", () => {
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages",
    ).as("halamanAwal");
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-input-group__message")
      .should("be.visible")
      .and("contain", "Required");
    cy.wait("@halamanAwal").its("response.statusCode").should("eq", 200);
  });
  it("TC-008-Forgot your password", () => {
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages",
    ).as("halamanRegister");
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.contains("Forgot your password").should("be.visible").click();
    cy.url("include", "/requestPasswordResetCode");
    cy.get('input[name="username"]').type("admin");
    cy.contains("Reset Password").should("be.visible").click();
    cy.wait("@halamanRegister").its("response.statusCode").should("eq", 200);
  });
});
