const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

describe("Serve API", () => {
  test("it should serve a new API Key and give 200 response status", async () => {
    await request.get("/api/generate");
    const response = await request.get("/api/serve");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      key: response.body.key,
    });
  });

  test("it should give 404 error when no key is available", async () => {
    const response = await request.get("/api/serve");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      result: "No API Key available",
    });
  });
});
