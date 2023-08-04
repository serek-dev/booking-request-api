import { IsUUID } from "class-validator";
import { ConfirmBookingRequestDto } from "../../../infrastructure/dto/confirm-booking-request.dto";

export class ConfirmBookingRequestCommand implements ConfirmBookingRequestDto {
  @IsUUID()
  id: string;
}
