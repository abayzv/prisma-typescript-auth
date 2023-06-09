import app from "../../../app";
import request from "supertest";
import { db } from "../../../utils/db";

let token: string = "";
let refreshToken: string = "";
let testEmail: string = "test@test.com";

// Login Test
describe("POST /api/v1/auth/login", () => {
  it("should return 400 if email or password is missing", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "admin@admin.com",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "You must provide an email and a password."
    );
  });
  it("should return 403 if email or password is invalid", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "test@test.com",
      password: "test",
    });
    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Invalid login credentials.");
  });
  it("should return 200 if email and password are valid", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "admin@admin.com",
      password: "P@ssw0rd",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("refreshToken");

    token = response.body.accessToken;
    refreshToken = response.body.refreshToken;
  });
});

// Register Test
describe("POST /api/v1/auth/register", () => {
  it("should return 400 if email, password or name is missing", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      email: "",
      password: "",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "You must provide an email, a password and a name."
    );
  });
  it("should return 409 if email already exists", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      email: "admin@admin.com",
      password: "P@ssw0rd",
      name: "Test User",
    });
    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Email already in use.");
  });
  it("should return 200 if email, password and name are valid", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      email: testEmail,
      password: "P@ssw0rd",
      name: "Test User",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("refreshToken");
  });
});

// Refresh Token Test
describe("POST /api/v1/auth/refreshToken", () => {
  it("should return 400 if refreshToken is missing", async () => {
    const response = await request(app).post("/api/v1/auth/refreshToken").send({
      refreshToken: "",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing refresh token.");
  });
  it("should return 200 if refreshToken is valid", async () => {
    const response = await request(app).post("/api/v1/auth/refreshToken").send({
      refreshToken: refreshToken,
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("refreshToken");
  });
});

// revoke token
describe("POST /api/v1/auth/revokeRefreshTokens", () => {
  it("should user id not found", async () => {
    const response = await request(app)
      .post("/api/v1/auth/revokeRefreshTokens")
      .send({
        userId: "123456789",
      });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User ID not found");
  });
});

afterAll(async () => {
  await db.user.delete({
    where: {
      email: testEmail,
    },
  });
});
