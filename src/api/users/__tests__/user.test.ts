import app from "../../../app";
import request from "supertest";

let token: string = "";

// get token
beforeAll(async () => {
  const response = await request(app).post("/api/v1/auth/login").send({
    email: "super@admin.com",
    password: "P@ssw0rd",
  });
  token = response.body.accessToken;
});

// get all user test
describe("GET /api/v1/users", () => {
  it("should return 200 if user is authenticated", async () => {
    const response = await request(app)
      .get("/api/v1/users")
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
  it("should return 401 if user is not authenticated", async () => {
    const response = await request(app).get("/api/v1/users");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(" Un-Authorized ");
  });
});
