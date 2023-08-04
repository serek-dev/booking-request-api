import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {BookingRequestCreatedEvent} from '../../domain/event/booking-request-created.event';
import {writeFileSync} from 'fs';

@EventsHandler(BookingRequestCreatedEvent)
export class BookingRequestCreatedHandler
  implements IEventHandler<BookingRequestCreatedEvent>
{
  handle(event: BookingRequestCreatedEvent): any {
    writeFileSync('./test.txt', 'hello from the handler! ' + event.id, {
      flag: 'w',
    });
  }
}
