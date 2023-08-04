import { BookingRequest } from "../../domain/booking-request";
import { BookingRepositoryMock } from "./booking-repository.mock";
import { Customer } from "../../domain/customer";
import { Availability } from "../../domain/availability";
import { Range } from "../../domain/range";

describe("Booking repository mock", () => {
  it("should store on first persistence", async () => {
    // Given I have a brand-new entity
    const entity = new BookingRequest(
      "id",
      new Customer("fake@email.com", "Customer-name", "Last-name", 48500355031),
      new Availability("avail-id", new Range(new Date(2023), new Date(2024)))
    );

    // And my Repository
    const sut = new BookingRepositoryMock();

    // When I attempt to persist it
    sut.store(entity);

    // Then it should be stored
    expect(sut.data.length).toBe(2);
  });

  it("should update on consecutive persistence", async () => {
    // Given I have some existing entity
    const entity = new BookingRequest(
      "1",
      new Customer("fake@email.com", "Customer-name", "Last-name", 48500355031),
      new Availability("avail-id", new Range(new Date(2023), new Date(2024)))
    );
    const sut = new BookingRepositoryMock();
    sut.store(entity);

    // When I attempt to persist entity with the same id
    const entityUpdated = new BookingRequest(
      "1",
      new Customer("fake@email.com", "Customer-name", "Last-name", 48500355031),
      new Availability("avail-id", new Range(new Date(2023), new Date(2024)))
    );
    sut.store(entityUpdated);

    // Then it should be updated
    expect(sut.data.length).toBe(2);
    expect(sut.data[0].customer).not.toBeNull();
  });
});
