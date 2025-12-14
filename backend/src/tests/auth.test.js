require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

beforeEach(async () => {
  await User.deleteMany({});   // ✅ CLEAN DB BEFORE EACH TEST
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Naincy",
        email: "naincy@test.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(201);
  });
});

it("should login user with correct credentials", async () => {
  // first register user
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Naincy",
      email: "login@test.com",
      password: "123456",
    });

  // then login
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "login@test.com",
      password: "123456",
    });

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("token");
});

it("should not login user with wrong password", async () => {
  // register user
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Naincy",
      email: "wrong@test.com",
      password: "123456",
    });

  // attempt login with wrong password
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "wrong@test.com",
      password: "wrongpass",
    });

  expect(res.statusCode).toBe(401);
});

