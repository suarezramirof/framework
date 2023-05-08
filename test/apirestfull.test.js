import supertest from "supertest";
import { expect } from "chai";
import generator from "./generator/products.js";
import messageGenerator from "./generator/messages.js";

const request = supertest("http://localhost:8080");

describe("Test api restfull", () => {
  describe("GET products", () => {
    let response;
    before(async () => {
      response = await request.get("/api/productos");
    });
    it("Should return 200", async () => {
      expect(response.status).to.equal(200);
    });
    it("Should return an array", async () => {
      const products = response.body;
      expect(products).to.be.an("array");
    });
  });
  let id = null;
  describe("POST product", () => {
    let response;
    let item;
    before(async () => {
      item = generator();
      response = await request.post("/api/productos").send(item);
    });
    it("Should return 200", async () => {
      expect(response.status).to.equal(200);
    });
    it("Should return added product", async () => {
      expect(response.body).to.include.keys("id", "nombre", "precio", "foto");
      const product = response.body;
      id = product.id;
      expect(product.nombre).to.equal(item.nombre);
      expect(product.precio).to.equal(item.precio);
      expect(product.foto).to.equal(item.foto);
    });
    it("Product should be in database", async () => {
      const response = await request.get("/api/productos");
      const products = response.body;
      const product = products.find((p) => p.id === id);
      expect(product).to.include.keys("id", "nombre", "precio", "foto");
      expect(product.nombre).to.equal(item.nombre);
      expect(product.precio).to.equal(item.precio);
      expect(product.foto).to.equal(item.foto);
    });
  });
  describe("PUT products", () => {
    let response;
    let item;
    before(async () => {
      item = generator();
      response = await request.put("/api/productos/" + id).send(item);
    });
    it("Should return 200", async () => {
      expect(response.status).to.equal(200);
    });
    it("Should return updated product", async () => {
      const product = response.body;
      expect(product).to.include.keys("id", "nombre", "precio", "foto");
      expect(product.nombre).to.equal(item.nombre);
      expect(product.precio).to.equal(item.precio);
      expect(product.foto).to.equal(item.foto);
    });
    it("Updated product should be in database", async () => {
      const response = await request.get("/api/productos");
      const products = response.body;
      const product = products.find((p) => p.id === id);
      expect(product).to.include.keys("id", "nombre", "precio", "foto");
      expect(product.nombre).to.equal(item.nombre);
      expect(product.precio).to.equal(item.precio);
      expect(product.foto).to.equal(item.foto);
    });
  });
  describe("DELETE products", () => {
    let response;
    before(async () => {
      response = await request.delete("/api/productos/" + id);
    });
    it("Should return 200", async () => {
      expect(response.status).to.equal(200);
    });
    it("Should return deleted product", async () => {
      const product = response.body;
      expect(product).to.include.keys("id", "nombre", "precio", "foto");
      expect(product.id).to.equal(id);
    });
    it("Deleted product should not be in database", async () => {
      const response = await request.get("/api/productos");
      const products = response.body;
      const product = products.find((p) => p.id === id);
      expect(product).to.be.undefined;
    });
  });

  describe("GET messages", () => {
    let response;
    before(async () => {
      response = await request.get("/api/mensajes");
    });
    it("Should return 200", async () => {
      expect(response.status).to.equal(200);
    });
    it("Should return an array", async () => {
      const messages = response.body;
      expect(messages).to.be.an("array");
    });
  });
  describe("POST message", () => {
    let response;
    let item;
    before(async () => {
      item = messageGenerator();
      response = await request.post("/api/mensajes").send(item);
    });
    it("Should return 200", async () => {
      expect(response.status).to.equal(200);
    });
    it("Should return added message", async () => {
      expect(response.body).to.include.keys("id", "author", "text");
      const message = response.body;
      id = message.id;
      expect(message.author.id).to.equal(item.author.id);
      expect(message.author.nombre).to.equal(item.author.nombre);
      expect(message.author.apellido).to.equal(item.author.apellido);
      expect(message.author.edad).to.equal(item.author.edad);
      expect(message.author.alias).to.equal(item.author.alias);
      expect(message.author.avatar).to.equal(item.author.avatar);
      expect(message.text).to.equal(item.text);
    });
    it("Message should be in database", async () => {
      const response = await request.get("/api/mensajes");
      const messages = response.body;
      const message = messages.find((p) => p.id === id);
      expect(message).to.include.keys("id", "author", "text");
    });
  });
  
  describe("DELETE messages", () => {
    let response;
    before(async () => {
      response = await request.delete("/api/mensajes/" + id);
    });
    it("Should return 200", async () => {
      expect(response.status).to.equal(200);
    });
    it("Should return deleted message", async () => {
      const message = response.body;
      expect(message).to.include.keys("id", "author", "text");
      expect(message.id).to.equal(id);
    });
    it("Deleted message should not be in database", async () => {
      const response = await request.get("/api/mensajes");
      const messages = response.body;
      const message = messages.find((p) => p.id === id);
      expect(message).to.be.undefined;
    });
  });
});
