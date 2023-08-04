import { BookingRequest } from "./booking-request";
import { AggregateRoot } from "@nestjs/cqrs";
import { BookingRequestCreatedEvent } from "./event/booking-request-created.event";
import { Customer } from "./customer";
import { Availability } from "./availability";
import { Range } from "./range";

describe("Booking request entity", () => {
  let validCustomer: Customer;
  let validAvailability: Availability;

  beforeEach(function () {
    validCustomer = new Customer(
      "fake@email.com",
      "Customer-name",
      "Doe",
      48500355031
    );
    validAvailability = new Availability(
      "avail-id",
      new Range(new Date(2023), new Date(2024))
    );
  });

  it("it should be an instance of Aggregate Root", () => {
    const sut = new BookingRequest(
      "whatever-i-want",
      validCustomer,
      validAvailability
    );
    expect(sut).toBeInstanceOf(AggregateRoot);
  });

  it("should create a valid Booking Request entity", () => {
    const sut = new BookingRequest(
      "whatever-i-want",
      validCustomer,
      validAvailability
    );
    expect(sut.id).toBe("whatever-i-want");
  });

  it("it should emmit event on creation", () => {
    // When I create new Booking Request
    const sut = new BookingRequest(
      "uuid",
      new Customer("fake@email.com", "Customer-name", "Doe", 48500355031),
      validAvailability
    );

    // Then BookingRequestCreatedEvent should be recorded
    expect(sut.getUncommittedEvents().length).toBe(1);

    // And it's data should be populated from entity
    const event = sut
      .getUncommittedEvents()
      .pop() as BookingRequestCreatedEvent;
    expect(event.id).toBe("uuid");
    expect(event.customerEmail).toBe("fake@email.com");
    expect(event.customerFirstName).toBe("Customer-name");
    expect(event.availabilityRangeFrom).toEqual(new Date(2023));
    expect(event.availabilityRangeTo).toEqual(new Date(2024));
  });
});
