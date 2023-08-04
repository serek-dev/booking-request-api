import {Customer} from '../../domain/customer';
import {Availability} from '../../domain/availability';
import {Range} from '../../domain/range';
import {BookingRequest} from '../../domain/booking-request';
import {MockAdapterEventBus} from './mock-adapter-event.bus';

describe('MockAdapterEventBus', () => {
  it('should publish event using mock bus', () => {
    // Given I have a valid Booking Request
    const entity = new BookingRequest(
      'whatever-i-want',
      new Customer('fake@email.com', 'Customer-name', 'Doe', 48500355031),
      new Availability('avail-id', new Range(new Date(2023), new Date(2024))),
    );

    // And my publisher
    const sut = new MockAdapterEventBus();

    // When I attempt to publish
    sut.publishFrom(entity);

    // Then data should be stored
    expect(sut.data.length).toBe(1);

    // And no unpublished events should be on entity
    expect(entity.getUncommittedEvents().length).toBe(0);
  });
});
