import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "../ui/app.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateBookingRequestHandler } from "../application/command/create/create-booking-request.handler";
import { BookingRepositoryMock } from "./repository/booking-repository.mock";
import { BookingRequestFactory } from "../domain/booking-request.factory";
import { BookingRequestCreatedHandler } from "./event-handler/booking-request-created.handler";
import { NestAdapterEventBus } from "./bus/nest-adapter-event.bus";
import { ConfirmBookingRequestHandler } from "../application/command/confirm/confirm-booking-request.handler";
import { BookingRequestExistsValidator } from "./validator/booking-request-exists.validator";
import { AccessKeyMiddleware } from "./middleware/access-key.middleware";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [CqrsModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    BookingRequestExistsValidator,
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
    {
      provide: "ApiKey",
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<string>("API_KEY");
      },
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessKeyMiddleware).forRoutes("*");
  }
}
