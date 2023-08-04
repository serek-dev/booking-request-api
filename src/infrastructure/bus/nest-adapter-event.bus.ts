import {IEventBus} from '../../application/command/event.bus';
import {AggregateRoot, EventPublisher} from '@nestjs/cqrs';
import {Injectable} from '@nestjs/common';

@Injectable()
export class NestAdapterEventBus implements IEventBus {
  constructor(private readonly bus: EventPublisher) {}

  publishFrom(entity: AggregateRoot): void {
    this.bus.mergeObjectContext(entity);
    entity.commit();
  }
}
