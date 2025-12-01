test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://vicenteluiz.com.br");
  expect(response.status).toBe(200);
});
