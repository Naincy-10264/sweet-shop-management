require("dotenv").config();   

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
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
