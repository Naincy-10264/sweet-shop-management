require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");
const Sweet = require("../models/Sweet");


let adminToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

beforeEach(async () => {
  await User.deleteMany({});
  await Sweet.deleteMany({});

  // create admin user
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Admin",
      email: "admin@test.com",
      password: "123456",
    });

  // manually update role to admin
  await User.updateOne(
    { email: "admin@test.com" },
    { role: "admin" }
  );

  // login admin
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@test.com",
      password: "123456",
    });

  adminToken = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Sweet API", () => {
  it("should allow admin to add a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 100,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Ladoo");
  });

  it("should allow logged-in user to get all sweets", async () => {
  // add a sweet as admin
  await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Barfi",
      category: "Indian",
      price: 15,
      quantity: 50,
    });

  // get sweets as logged-in admin (any logged-in user works)
  const res = await request(app)
    .get("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});
it("should search sweets by category", async () => {
  // add sweet
  await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Rasgulla",
      category: "Bengali",
      price: 20,
      quantity: 30,
    });

  const res = await request(app)
    .get("/api/sweets/search?category=Bengali")
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0].name).toBe("Rasgulla");
});
it("should allow user to purchase a sweet", async () => {
  // add sweet
  const addRes = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Jalebi",
      category: "Indian",
      price: 12,
      quantity: 5,
    });

  const sweetId = addRes.body._id;

  // purchase
  const res = await request(app)
    .post(`/api/sweets/${sweetId}/purchase`)
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.quantity).toBe(4);
});

it("should not allow purchase if sweet is out of stock", async () => {
  // add sweet with zero quantity
  const addRes = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Peda",
      category: "Indian",
      price: 8,
      quantity: 0,
    });

  const sweetId = addRes.body._id;

  // try to purchase
  const res = await request(app)
    .post(`/api/sweets/${sweetId}/purchase`)
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toBe("Out of stock");
});

it("should allow admin to restock a sweet", async () => {
  // add sweet
  const addRes = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Kaju Katli",
      category: "Indian",
      price: 25,
      quantity: 10,
    });

  const sweetId = addRes.body._id;

  // restock
  const res = await request(app)
    .post(`/api/sweets/${sweetId}/restock`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      quantity: 5,
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.quantity).toBe(15);
});

it("should allow admin to update a sweet", async () => {
  // add sweet
  const addRes = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Milk Cake",
      category: "Indian",
      price: 30,
      quantity: 20,
    });

  const sweetId = addRes.body._id;

  // update sweet
  const res = await request(app)
    .put(`/api/sweets/${sweetId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      price: 35,
      quantity: 25,
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.price).toBe(35);
  expect(res.body.quantity).toBe(25);
});

it("should allow admin to delete a sweet", async () => {
  // add sweet
  const addRes = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Soan Papdi",
      category: "Indian",
      price: 18,
      quantity: 40,
    });

  const sweetId = addRes.body._id;

  // delete sweet
  const res = await request(app)
    .delete(`/api/sweets/${sweetId}`)
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe("Sweet deleted successfully");
});


});
