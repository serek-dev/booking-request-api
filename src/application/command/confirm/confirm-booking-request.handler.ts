import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {BookingRepository} from '../../../domain/booking.repository';
import {firstValueFrom} from 'rxjs';
import {Inject} from '@nestjs/common';
import {BookingRequestFactory} from '../../../domain/booking-request.factory';
import {IEventBus} from '../event.bus';
import {ConfirmBookingRequestCommand} from './confirm-booking-request.command';

@CommandHandler(ConfirmBookingRequestCommand)
export class ConfirmBookingRequestHandler
  implements ICommandHandler<ConfirmBookingRequestCommand>
{
  constructor(
    @Inject('BookingRepository') private readonly repo: BookingRepository,
    private readonly factory: BookingRequestFactory,
    @Inject('IEventBus') private readonly eventBus: IEventBus,
  ) {}

  async execute(command: ConfirmBookingRequestCommand): Promise<void> {
    const entity = await firstValueFrom(this.repo.findOne(command.id));

    if (!entity) {
      throw new Error('Entity not found: ' + command.id);
    }

    this.eventBus.publishFrom(entity);

    return Promise.resolve(await firstValueFrom(this.repo.store(entity)));
  }
}
