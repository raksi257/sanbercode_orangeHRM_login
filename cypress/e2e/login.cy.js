describe("verifikasi fungsi login", () => {
  it("TC-001-Login dengan username valid password valid", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-topbar-header-title").should("contain", "Dashboard");
  });
  it("TC-002-Login dengan username tidak valid password valid", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get('input[name="username"]').type("adminnnn");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-alert-content-text")
      .should("be.visible")
      .and("contain", "Invalid credentials");
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
  it("TC-004-Login dengan username kosong password valid", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-input-group__message")
      .should("be.visible")
      .and("contain", "Required");
  });
  it("TC-005-Login dengan username valid password kosong", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get('input[name="username"]').type("admin");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-input-group__message")
      .should("be.visible")
      .and("contain", "Required");
  });
  it("TC-006-Login dengan username kosong password kosong", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-input-group__message")
      .should("be.visible")
      .and("contain", "Required");
  });
  const username = "Admin";
  const password = "admin123";

  it("TC-007-Password Bersifat Masked", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    cy.get('input[name="password"]')
      .should("be.visible")
      .type("admin123")
      .should("have.attr", "type", "password");
  });
  it("TC-008-Username dengan spasi di awal/akhir", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get('input[name="username"]').type(" admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-alert-content-text")
      .should("be.visible")
      .and("contain", "Invalid credentials");
  });
  it("TC-009-Case sensitivity password", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get('input[name="username"]').type("admin");
    cy.get('input[name="password"]').type("ADMIN123");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-alert-content-text")
      .should("be.visible")
      .and("contain", "Invalid credentials");
  });
  it("TC-010-Forgot your password", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.contains("Forgot your password").should("be.visible").click();
    cy.url("include", "/requestPasswordResetCode");
    cy.get('input[name="username"]').type("admin");
    cy.contains("Reset Password").should("be.visible").click();
  });
  it("TC-011-mencoba logout setelah login", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    it("TC-LOGIN-011 - Logout Setelah Login", () => {
      // Login
      cy.get('input[name="username"]').should("be.visible").type("Admin");

      cy.get('input[name="password"]').should("be.visible").type("admin123");

      cy.get('button[type="submit"]').should("be.visible").click();

      // Validasi berhasil login
      cy.get(".oxd-topbar-header-title")
        .should("be.visible")
        .and("contain", "Dashboard");

      // Buka menu profil
      cy.get(".oxd-userdropdown-tab").should("be.visible").click();

      // Klik Logout
      cy.contains("Logout").should("be.visible").click();

      // Validasi kembali ke halaman login
      cy.url().should("include", "/auth/login");

      cy.get('input[name="username"]').should("be.visible");

      cy.get('input[name="password"]').should("be.visible");
    });
  });
  it("TC-012-Akses dashboard tanpa autentikasi", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index",
    );
    cy.url().should("include", "/auth/login");
    cy.get('input[name="username"]').should("be.visible");
  });
});
