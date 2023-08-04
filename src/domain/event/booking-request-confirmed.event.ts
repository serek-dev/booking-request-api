export class BookingRequestConfirmedEvent {
  constructor(
    public readonly id: string,
    public readonly customerEmail: string,
    public readonly customerFirstName: string,
    public readonly customerLastName: string,
    public readonly customerPhoneNumber: number,
    public readonly availabilityId: string,
    public readonly specialistId: string,
    public readonly date: Date,
  ) {}
}
