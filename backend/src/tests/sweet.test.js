require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");

let adminToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

beforeEach(async () => {
  await User.deleteMany({});

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

});
