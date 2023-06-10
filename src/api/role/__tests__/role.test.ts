import app from "../../../app";
import request from "supertest";
import { db } from "../../../utils/db";

let token: string = "";
let randomName: string = "Test Role";
let roleId: string = "";

// get token
beforeAll(async () => {
  const response = await request(app).post("/api/v1/auth/login").send({
    email: "super@admin.com",
    password: "P@ssw0rd",
  });
  token = response.body.accessToken;
});

// view all role
describe("GET /api/v1/roles", () => {
  it("should return role name superadmin if query name is superadmin", async () => {
    const response = await request(app)
      .get("/api/v1/roles")
      .set("Authorization", `Bearer ${token}`)
      .query({ name: "superadmin" })
      .send();
    expect(response.status).toBe(200);
    expect(response.body.data[0].name).toBe("superadmin");
  });
  it("should return 200 if role is found", async () => {
    const response = await request(app)
      .get("/api/v1/roles")
      .send()
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("should return 401 if user is not authenticated", async () => {
    const response = await request(app).get("/api/v1/roles").send();
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(" Un-Authorized ");
  });
});

// create role
describe("POST /api/v1/roles", () => {
  it("should return 401 if user is not authenticated", async () => {
    const response = await request(app).post("/api/v1/roles").send({});
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(" Un-Authorized ");
  });
  it("should return 400 if name is missing", async () => {
    const response = await request(app)
      .post("/api/v1/roles")
      .send({})
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });
  it("should return 200 if role is created", async () => {
    const response = await request(app)
      .post("/api/v1/roles")
      .send({ name: randomName })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    roleId = response.body.data.id;
  });
  it("should return 400 if role is already exist", async () => {
    const response = await request(app)
      .post("/api/v1/roles")
      .send({ name: randomName })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Role already exist");
  });
});
