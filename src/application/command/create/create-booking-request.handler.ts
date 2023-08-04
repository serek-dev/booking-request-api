import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateBookingRequestCommand } from "./create-booking-request.command";
import { BookingRepository } from "../../../domain/booking.repository";
import { firstValueFrom } from "rxjs";
import { Inject } from "@nestjs/common";
import { CreateBookingRequest } from "../../../infrastructure/dto/create-booking-request.dto";
import { BookingRequestFactory } from "../../../domain/booking-request.factory";
import { IEventBus } from "../event.bus";

@CommandHandler(CreateBookingRequestCommand)
export class CreateBookingRequestHandler
  implements ICommandHandler<CreateBookingRequestCommand>
{
  constructor(
    @Inject("BookingRepository") private readonly repo: BookingRepository,
    private readonly factory: BookingRequestFactory,
    @Inject("IEventBus") private readonly eventBus: IEventBus
  ) {}

  execute(command: CreateBookingRequest): Promise<void> {
    const entity = this.factory.create(command);

    this.eventBus.publishFrom(entity);

    return Promise.resolve(firstValueFrom(this.repo.store(entity)));
  }
}
