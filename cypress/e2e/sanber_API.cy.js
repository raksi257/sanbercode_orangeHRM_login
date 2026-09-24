describe("User Testing", () => {
  it("GET list users", () => {
    cy.request({
      methode: "GET",
      url: "https://api.escuelajs.co/api/v1/categories/1",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id");
    });
  });
  it("Create Category 1", () => {
    cy.request({
      method: "POST",
      url: "https://api.escuelajs.co/api/v1/categories",
      body: {
        name: "Motor ilang1",
        image: "https://placeimg.com/640/480/any",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");
    });
  });
  it("Update Category 1", () => {
    cy.request({
      method: "PUT",
      url: "https://api.escuelajs.co/api/v1/categories",
      body: {
        name: "Motor honda",
        image: "https://placeimg.com/640/480/any",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("id");
    });
  });
  it("Create Category 2", () => {
    cy.request({
      method: "POST",
      url: "https://api.escuelajs.co/api/v1/categories",
      body: {
        name: "Motor ilang2",
        image: "https://placeimg.com/640/480/any",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");
    });
  });
  it("GET list users 2", () => {
    cy.request({
      methode: "GET",
      url: "https://api.escuelajs.co/api/v1/categories/2",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id");
    });
  });
  it("Update 2 Category", () => {
    cy.request({
      method: "PUT",
      url: "https://api.escuelajs.co/api/v1/categories/1",
      body: {
        name: "Motor ilang1",
        image: "https://placeimg.com/640/480/any",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id");
    });
  });
  it("Create Category 3", () => {
    cy.request({
      method: "POST",
      url: "https://api.escuelajs.co/api/v1/categories",
      body: {
        name: "Motor ilang2",
        image: "https://placeimg.com/640/480/any",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");
    });
  });
  it("GET list users 3", () => {
    cy.request({
      methode: "GET",
      url: "https://api.escuelajs.co/api/v1/categories/2",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id");
    });
  });
  it("Update 3 Category", () => {
    cy.request({
      method: "PUT",
      url: "https://api.escuelajs.co/api/v1/categories/1",
      body: {
        name: "Motor ilang3",
        image: "https://placeimg.com/640/480/any",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id");
    });
  });
  it("DELETE 1 Category", () => {
    cy.request({
      method: "DELETE",
      url: "https://api.escuelajs.co/api/v1/categories/1",
      body: {
        name: "Motor ilang",
        image: "https://placeimg.com/640/480/any",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("1");
    });
  });
  it("DELETE 2 Category", () => {
    cy.request({
      method: "DELETE",
      url: "https://api.escuelajs.co/api/v1/categories/1",
      body: {
        name: "Motor ilang1",
        image: "https://placeimg.com/640/480/any",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("2");
    });
  });
  it("DELETE 3 Category", () => {
    cy.request({
      method: "DELETE",
      url: "https://api.escuelajs.co/api/v1/categories/1",
      body: {
        name: "Motor ilang2",
        image: "https://placeimg.com/640/480/any",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("2");
    });
  });
});
