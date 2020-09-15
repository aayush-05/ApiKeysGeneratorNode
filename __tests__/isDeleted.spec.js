const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const availableKeys = require("../randomApi/db/availableKeys");

jest.useFakeTimers();
test("it should delete a key automatically after 5 minute if key alive endpoint isn't accessed", async () => {
  await request.get("/api/generate");
  const responseKey = await request.get("/api/serve");
  expect(responseKey.status).toBe(200);
  expect(setTimeout).toBeCalled();
  jest.advanceTimersByTime(300000);
  expect(availableKeys[responseKey.body.key]).toBe(undefined);
});
