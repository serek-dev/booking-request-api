import { registerDecorator, ValidationOptions } from "class-validator";
import { BookingRequestExistsValidator } from "../validator/booking-request-exists.validator";

export function RequestBookingExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: "BookingRequestExists",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: BookingRequestExistsValidator,
    });
  };
}
