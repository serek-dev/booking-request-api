import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Inject, Injectable } from "@nestjs/common";
import { BookingRepository } from "../../domain/booking.repository";
import { firstValueFrom } from "rxjs";

@ValidatorConstraint({ name: "BookingRequestExists" })
@Injectable()
export class BookingRequestExistsValidator
  implements ValidatorConstraintInterface
{
  constructor(
    @Inject("BookingRepository") private readonly repo: BookingRepository
  ) {}

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Value ${validationArguments?.value} is not existing [RequestBooking]`;
  }

  async validate(
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationArguments?: ValidationArguments
  ): Promise<boolean> {
    const entity = await firstValueFrom(this.repo.findOne(value));
    return Promise.resolve(!!entity);
  }
}
