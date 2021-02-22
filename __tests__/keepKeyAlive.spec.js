const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const blockedKeys = require("../randomApi/db/blockedKeys");

describe("Keep Alive API", () => {
  jest.useFakeTimers();
  test("it should reset the time limit for a given API", async () => {
    await request.get("/api/generate");
    const responseKey = await request.get("/api/serve");
    expect(responseKey.status).toBe(200);
    expect(setTimeout).toBeCalled();
    jest.advanceTimersByTime(40000);
    const response = await request.patch(
      `/api/keepAlive/${responseKey.body.key}`
    );
    expect(response.status).toBe(200);
    expect(setTimeout).toBeCalled();
    jest.advanceTimersByTime(40000);
    expect(blockedKeys[responseKey.body.key]).not.toBe(undefined);
  });
});
