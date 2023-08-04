import {AggregateRoot} from '@nestjs/cqrs';

export interface IEventBus {
  publishFrom(command: AggregateRoot): void;
}
