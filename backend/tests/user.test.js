const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");

describe("User Auth", () => {
  const signupPayload = {
    name: "John Doe",
    email: "john@example.com",
    password: "StrongPass123",
    phone_number: "1234567890",
    gender: "male",
    date_of_birth: new Date("1990-01-01"),
    membership_status: "basic",
  };

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it("should signup a new user", async () => {
    const res = await api
      .post("/api/users/signup")
      .send(signupPayload)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(res.body).toHaveProperty("email", signupPayload.email);
    expect(res.body).toHaveProperty("token");

    const users = await User.find({});
    expect(users).toHaveLength(1);
  });

  it("should login and return a token", async () => {
    // create user first
    await api.post("/api/users/signup").send(signupPayload).expect(201);

    const res = await api
      .post("/api/users/login")
      .send({ email: signupPayload.email, password: signupPayload.password })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(res.body).toHaveProperty("email", signupPayload.email);
    expect(res.body).toHaveProperty("token");
  });

  it("should access protected route /me with Bearer token", async () => {
    const signupRes = await api
      .post("/api/users/signup")
      .send(signupPayload)
      .expect(201);

    const token = signupRes.body.token;

    const meRes = await api
      .get("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(meRes.body).toHaveProperty("_id");
  });

  it("should reject /me without token", async () => {
    await api.get("/api/users/me").expect(401);
  });
});
