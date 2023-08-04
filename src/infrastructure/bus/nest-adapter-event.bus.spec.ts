import { Customer } from "../../domain/customer";
import { Availability } from "../../domain/availability";
import { Range } from "../../domain/range";
import { BookingRequest } from "../../domain/booking-request";
import { NestAdapterEventBus } from "./nest-adapter-event.bus";
import { EventBus, EventPublisher } from "@nestjs/cqrs";

describe("NestAdapterEventBus", () => {
  it("should publish event using original nest bus", () => {
    // Given I have a valid Booking Request
    const entity = new BookingRequest(
      "whatever-i-want",
      new Customer("fake@email.com", "Customer-name", "Doe", 48500355031),
      new Availability("avail-id", new Range(new Date(2023), new Date(2024)))
    );

    // And my publisher
    const originalEventPublisher = new EventPublisher({} as EventBus);
    const spy = jest
      .spyOn(originalEventPublisher, "mergeObjectContext")
      .mockImplementation();

    const sut = new NestAdapterEventBus(originalEventPublisher);

    // When I attempt to publish
    sut.publishFrom(entity);

    // Then original event should be called
    expect(spy.mock.calls.length).toBe(1);

    // And no unpublished events should be on entity
    expect(entity.getUncommittedEvents().length).toBe(0);
  });
});
