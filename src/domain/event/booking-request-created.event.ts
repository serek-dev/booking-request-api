export class BookingRequestCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly customerEmail: string,
    public readonly customerFirstName: string,
    public readonly availabilityRangeFrom: Date,
    public readonly availabilityRangeTo: Date,
    public readonly specialistName: string
  ) {}
}
