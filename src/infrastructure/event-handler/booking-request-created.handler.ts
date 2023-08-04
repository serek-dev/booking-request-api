import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { BookingRequestCreatedEvent } from "../../domain/event/booking-request-created.event";

@EventsHandler(BookingRequestCreatedEvent)
export class BookingRequestCreatedHandler
  implements IEventHandler<BookingRequestCreatedEvent>
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(event: BookingRequestCreatedEvent): any {
    // writeFileSync("./test.txt", "hello from the handler! " + event.id, {
    //   flag: "w",
    // });
  }
}
