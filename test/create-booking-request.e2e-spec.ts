import { Test, TestingModule } from "@nestjs/testing";
import { HttpServer, INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/infrastructure/app.module";

describe("AppController - create booking request (e2e)", () => {
  let app: INestApplication;
  let server: HttpServer;

  const validRequest = {
    customerEmail: "something@valid.com",
    customerFirstName: "Joe",
    customerLastName: "Doe",
    customerPhoneNumber: 48500000000,
    availabilityId: "b261631b-d6d0-4c0b-977f-823e646e4ab9",
    availabilityRangeFrom: "2030-01-01T10:05:33",
    availabilityRangeTo: "2030-01-01T10:45:33",
    specialistId: "3faade1a-ea5a-4d16-bd02-c7ef6384cc33",
    specialistName: "Przemysław Rocks",
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
    server = app.getHttpServer();
  });

  afterEach(async () => {
    await app.close();
    // Close the server instance after each test
    server.close();
  });

  it("creates valid Booking Request", () => {
    return request(app.getHttpServer())
      .post("/bookings")
      .send(validRequest)
      .then((response) => {
        expect(response.body["id"]).not.toBeNull();
      });
  });

  it("fails validation on empty values", () => {
    Object.keys(validRequest).forEach((field: string) => {
      const invalidRequest = { ...validRequest };
      // @ts-ignore
      invalidRequest[field] = null;
      request(app.getHttpServer())
        .post("/bookings")
        .send(invalidRequest)
        .expect(400);
    });
  });

  it("fails validation on past availabilityRangeFrom", () => {
    const invalidRequest = { ...validRequest };
    invalidRequest.availabilityRangeFrom = "2020-01-01T10:05:33";
    return request(app.getHttpServer())
      .post("/bookings")
      .send(invalidRequest)
      .expect(400);
  });

  it("fails validation on past availabilityRangeTo", () => {
    const invalidRequest = { ...validRequest };
    invalidRequest.availabilityRangeTo = "2020-01-01T10:05:33";
    return request(app.getHttpServer())
      .post("/bookings")
      .send(invalidRequest)
      .expect(400);
  });

  it("fails validation on availabilityRangeTo less than availabilityRangeFrom", () => {
    const invalidRequest = { ...validRequest };
    invalidRequest.availabilityRangeFrom = "2030-01-01T11:05:33";
    invalidRequest.availabilityRangeTo = "2030-01-01T10:05:33";
    return request(app.getHttpServer())
      .post("/bookings")
      .send(invalidRequest)
      .expect(400);
  });

  it("fails validation on customerPhoneNumber < 500000000", () => {
    const invalidRequest = { ...validRequest };
    invalidRequest.customerPhoneNumber = 500000000 - 1;
    return request(app.getHttpServer())
      .post("/bookings")
      .send(invalidRequest)
      .expect(400);
  });

  it("fails validation on customerPhoneNumber > 99999999999", () => {
    const invalidRequest = { ...validRequest };
    invalidRequest.customerPhoneNumber = 99999999999 + 1;
    return request(app.getHttpServer())
      .post("/bookings")
      .send(invalidRequest)
      .expect(400);
  });

  it("fails validation on non uuid availabilityId", () => {
    const invalidRequest = { ...validRequest };
    invalidRequest.availabilityId = "not-uuid";
    return request(app.getHttpServer())
      .post("/bookings")
      .send(invalidRequest)
      .expect(400);
  });

  it("fails validation on non uuid specialistId", () => {
    const invalidRequest = { ...validRequest };
    invalidRequest.specialistId = "not-uuid";
    return request(app.getHttpServer())
      .post("/bookings")
      .send(invalidRequest)
      .expect(400);
  });
});
