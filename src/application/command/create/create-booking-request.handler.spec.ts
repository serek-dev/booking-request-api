import { CreateBookingRequestCommand } from "./create-booking-request.command";
import { CreateBookingRequestHandler } from "./create-booking-request.handler";
import { BookingRepositoryMock } from "../../../infrastructure/repository/booking-repository.mock";
import { BookingRequestFactory } from "../../../domain/booking-request.factory";
import { MockAdapterEventBus } from "../../../infrastructure/bus/mock-adapter-event.bus";

describe("Create booking request handler", () => {
  it("should dispatch an event resulting a persisting of booking", async () => {
    // Given I have a valid command
    const command = new CreateBookingRequestCommand();
    command.customerFirstName = "Joe";
    command.customerEmail = "joe@doe.com";
    command.availabilityId = "avail-id";
    command.availabilityRangeFrom = new Date(2023);
    command.availabilityRangeTo = new Date(2024);

    // And my handler
    const repo = new BookingRepositoryMock();
    const eventBus = new MockAdapterEventBus();
    const sut = new CreateBookingRequestHandler(
      repo,
      new BookingRequestFactory(),
      eventBus
    );

    // When I execute it
    await sut.execute(command);

    // Then repository should be used
    expect(repo.data.length).toBe(2);

    // And event's should be recorded and published
    expect(eventBus.data.length).toBe(1);
  });
});
