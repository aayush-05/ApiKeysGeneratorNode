const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

jest.useFakeTimers();
test("it should release a blocked key automatically after 1 minute", async () => {
  await request.get("/api/generate");
  const responseKey = await request.get("/api/serve");
  expect(responseKey.status).toBe(200);
  expect(setTimeout).toBeCalled();
  jest.advanceTimersByTime(60000);
  const response = await request.patch(`/api/unblock/${responseKey.body.key}`);
  expect(response.status).toBe(400);
});
