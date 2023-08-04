import {Test, TestingModule} from '@nestjs/testing';
import {HttpServer, INestApplication, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/infrastructure/app.module';
import {BookingRepositoryMock} from '../src/infrastructure/repository/booking-repository.mock';

describe('AppController - confirm booking request (e2e)', () => {
  let app: INestApplication;
  let server: HttpServer;

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

  it('confirms valid Booking Request', async () => {
    // Given I have an existing booking
    const existingBooking = BookingRepositoryMock.MOCK_1;

    // When I confirm it
    await request(app.getHttpServer())
      .patch(`/bookings/${existingBooking}/confirm`)
      .send()
      .then((response) => {
        expect(response.statusCode).toBe(202);
        expect(response.body['item']['id']).not.toBeNull();
      });
  });

  it('validation fails on non uuid argument', async () => {
    // Given I have invalid uuid booking
    const existingBooking = 'not-even-an-uuid';

    // When I confirm it
    await request(app.getHttpServer())
      .patch(`/bookings/${existingBooking}/confirm`)
      .send()
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  it('validation fails on non existing uuid argument', async () => {
    // Given I have invalid uuid booking
    const existingBooking = 'a90d8f1f-3b74-4a8f-96c2-d5b2cfd1f79d';

    // When I confirm it
    await request(app.getHttpServer())
      .patch(`/bookings/${existingBooking}/confirm`)
      .send()
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });
});
