import { BookingRepository } from "../../domain/booking.repository";
import { BookingRequest } from "../../domain/booking-request";
import { Observable, of } from "rxjs";
import { Injectable } from "@nestjs/common";
import { Customer } from "../../domain/customer";
import { Availability } from "../../domain/availability";
import { Range } from "../../domain/range";

@Injectable()
export class BookingRepositoryMock implements BookingRepository {
  public static readonly MOCK_1 = "72f4e085-6871-4421-9e6c-9f96f08a7946";

  public readonly data: BookingRequest[] = [
    new BookingRequest(
      BookingRepositoryMock.MOCK_1,
      new Customer("fake@email.com", "Joe", "Doe", 48500355031),
      new Availability(
        "fake-availability-id",
        new Range(new Date(2020), new Date(2021))
      )
    ),
  ];

  store(entity: BookingRequest): Observable<void> {
    const index = this.data.findIndex((val) => val.id === entity.id);

    if (index !== -1) {
      this.data[index] = entity;
    } else {
      this.data.push(entity);
    }

    return of(void 0);
  }

  findOne(id: string): Observable<BookingRequest | null> {
    const index = this.data.findIndex((val) => val.id === id);

    return of(this.data[index]);
  }
}
