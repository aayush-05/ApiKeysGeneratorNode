const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

describe("Generate API", () => {
  test("it should generate API Key and give 200 response status", async () => {
    const response = await request.get("/api/generate");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      result: "API key generated",
    });
  });
});
