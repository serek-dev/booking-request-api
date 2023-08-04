import { IEventBus } from "../../application/command/event.bus";
import { AggregateRoot } from "@nestjs/cqrs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MockAdapterEventBus implements IEventBus {
  public readonly data: AggregateRoot[] = [];

  publishFrom(entity: AggregateRoot): void {
    this.data.push(entity);
    entity.commit();
  }
}
