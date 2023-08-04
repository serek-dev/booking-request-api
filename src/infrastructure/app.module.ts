import { Module } from "@nestjs/common";
import { AppController } from "../ui/app.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateBookingRequestHandler } from "../application/command/create/create-booking-request.handler";
import { BookingRepositoryMock } from "./repository/booking-repository.mock";
import { BookingRequestFactory } from "../domain/booking-request.factory";
import { BookingRequestCreatedHandler } from "./event-handler/booking-request-created.handler";
import { NestAdapterEventBus } from "./bus/nest-adapter-event.bus";
import { ConfirmBookingRequestHandler } from "../application/command/confirm/confirm-booking-request.handler";

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [
    CreateBookingRequestHandler,
    BookingRequestFactory,
    BookingRequestCreatedHandler,
    ConfirmBookingRequestHandler,
    {
      provide: "BookingRepository",
      useClass: BookingRepositoryMock,
    },
    {
      provide: "IEventBus",
      useClass: NestAdapterEventBus,
    },
  ],
})
export class AppModule {}
