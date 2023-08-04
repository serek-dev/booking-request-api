export interface CreateBookingRequest {
  readonly id: string;
  readonly customerEmail: string;
  readonly customerFirstName: string;
  readonly customerLastName: string;
  readonly customerPhoneNumber: number;
  readonly availabilityId: string;
  readonly availabilityRangeFrom: Date;
  readonly availabilityRangeTo: Date;
  readonly specialistId: string;
  readonly specialistName: string;
}
