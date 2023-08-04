import {BookingRequest} from './booking-request';
import {Observable} from 'rxjs';

export interface BookingRepository {
  store(entity: BookingRequest): Observable<void>;

  findOne(id: string): Observable<BookingRequest | null>;
}
