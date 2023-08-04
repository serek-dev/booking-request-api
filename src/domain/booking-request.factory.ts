import {Customer} from './customer';
import {Availability} from './availability';
import {BookingRequest} from './booking-request';
import {Range} from './range';
import {CreateBookingRequest} from '../infrastructure/dto/create-booking-request.dto';
import {Injectable} from '@nestjs/common';

@Injectable()
export class BookingRequestFactory {
  create(dto: CreateBookingRequest): BookingRequest {
    return new BookingRequest(
      dto.id,
      new Customer(
        dto.customerEmail,
        dto.customerFirstName,
        dto.customerLastName,
        dto.customerPhoneNumber,
      ),
      new Availability(
        dto.availabilityId,
        new Range(dto.availabilityRangeFrom, dto.availabilityRangeTo),
      ),
    );
  }
}
