import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Length,
  Max,
  Min,
  MinDate,
} from "class-validator";
import { Transform } from "class-transformer";
import { MinDateByField } from "../../../infrastructure/decorator/min-date-by-field.decorator";
import { CreateBookingRequest } from "../../../infrastructure/dto/create-booking-request.dto";

export class CreateBookingRequestCommand implements CreateBookingRequest {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  @IsNotEmpty()
  @Length(3, 25)
  customerFirstName: string;

  @IsNotEmpty()
  @Length(3, 25)
  customerLastName: string;

  @Min(500000000)
  @Max(99999999999)
  @IsNotEmpty()
  customerPhoneNumber: number;

  @IsNotEmpty()
  @IsUUID()
  availabilityId: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  @MinDate(new Date())
  availabilityRangeFrom: Date;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  @MinDateByField("availabilityRangeFrom")
  availabilityRangeTo: Date;

  @IsNotEmpty()
  @IsUUID()
  specialistId: string;

  @IsNotEmpty() specialistName: string;
}
