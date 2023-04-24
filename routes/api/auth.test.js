const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");
const { User } = require("../../models");

const { PORT, DB_HOST_TEST } = process.env;

describe("test /api/auth route", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close(DB_HOST_TEST);
  });
  // afterEach(async () => {
  //   await User.deleteMany({});
  // });

  test("test register route with correct data", async () => {
    const registerData = {
      name: "Maryna1",
      email: "maryna1@gmail.com",
      password: "123456",
    };

    const res = await request(app)
      .post("/api/auth/register")
      .send(registerData);

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(registerData.email);
    expect(res.body.subscription).toBe("starter");

    const user = await User.findOne({ email: registerData.email });
    expect(user.name).toBe(registerData.name);
    expect(user.email).toBe(registerData.email);
  });
  test("test login route with correct data", async () => {
    const loginData = {
      email: "maryna1@gmail.com",
      password: "123456",
    };

    const res = await request(app).post("/api/auth/login").send(loginData);

    expect(res.statusCode).toBe(200);

    const user = await User.findOne({ email: loginData.email });
    expect(res.body.token).toBe(user.token);
    expect(user.email).toBe(loginData.email);
  });
});

// describe("test /api/auth/login route", () => {
//   let server = null;
//   beforeAll(async () => {
//     server = app.listen(PORT);
//     await mongoose.connect(DB_HOST_TEST);
//   });

//   afterAll(async () => {
//     server.close();
//     await mongoose.connection.close(DB_HOST_TEST);
//   });

// test("test login route with correct data", async () => {
//   const loginData = {
//     email: "maryna1@gmail.com",
//     password: "123456",
//   };

//   const res = await request(app).post("/api/auth/login").send(loginData);

//   expect(res.statusCode).toBe(200);

//   const user = await User.findOne({ email: loginData.email });
//   expect(res.body.token).toBe(user.token);
//   expect(user.email).toBe(loginData.email);
// });
// });
