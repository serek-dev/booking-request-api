import {Customer} from './customer';
import {AggregateRoot} from '@nestjs/cqrs';
import {BookingRequestCreatedEvent} from './event/booking-request-created.event';
import {Availability} from './availability';
import {BookingRequestConfirmedEvent} from './event/booking-request-confirmed.event';

export class BookingRequest extends AggregateRoot {
  private isConfirmed = false;

  constructor(
    public readonly id: string,
    public readonly customer: Customer,
    public readonly availability: Availability,
  ) {
    super();
    this.apply(
      new BookingRequestCreatedEvent(
        this.id,
        this.customer.email,
        this.customer.firstName,
        this.availability.range.from,
        this.availability.range.to,
        'Joe Doe', // todo: hardcoded
      ),
    );
  }

  confirm(): void {
    if (this.isConfirmed) {
      throw new Error('Already confirmed');
    }

    this.isConfirmed = true;

    this.apply(
      new BookingRequestConfirmedEvent(
        this.id,
        this.customer.email,
        this.customer.firstName,
        this.customer.lastName,
        this.customer.phoneNumber,
        this.availability.id,
        'specialist-id', // todo: hardcoded,
        new Date(),
      ),
    );
  }
}
