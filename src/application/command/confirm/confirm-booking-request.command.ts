import { IsUUID } from "class-validator";
import { ConfirmBookingRequestDto } from "../../../infrastructure/dto/confirm-booking-request.dto";
import { RequestBookingExists } from "../../../infrastructure/decorator/request-booking.exists";

export class ConfirmBookingRequestCommand implements ConfirmBookingRequestDto {
  @IsUUID()
  @RequestBookingExists()
  id: string;
}
