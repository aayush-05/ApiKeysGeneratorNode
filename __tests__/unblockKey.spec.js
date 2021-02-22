const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

describe("Unblock API", () => {
  test("it should unblock given API Key and give 200 response status", async () => {
    await request.get("/api/generate");
    const responseKey = await request.get("/api/serve");
    expect(responseKey.status).toBe(200);
    const response = await request.patch(
      `/api/unblock/${responseKey.body.key}`
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      key: responseKey.body.key,
      result: "API key unblocked",
    });
  });

  test("it should give error when invalid key is given", async () => {
    const response = await request.patch(
      "/api/unblock/ba21e23484945c51f8acdd2da1c273b2"
    );
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      result: "API key not found",
    });
  });
});
