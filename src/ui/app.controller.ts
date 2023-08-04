import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { CreateBookingRequestCommand } from "../application/command/create/create-booking-request.command";
import { v4 as uuidv4 } from "uuid";
import { CommandBus } from "@nestjs/cqrs";
import { ConfirmBookingRequestCommand } from "../application/command/confirm/confirm-booking-request.command";

@Controller("bookings")
export class AppController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async createBookingRequest(
    @Body() command: CreateBookingRequestCommand,
    @Res() res: Response
  ) {
    command.id = uuidv4();

    await this.commandBus.execute(command);

    res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: "Booking request created",
      item: {
        id: command.id,
      },
    });
  }

  @Patch(":id/confirm")
  async confirmBookingRequest(
    @Param() command: ConfirmBookingRequestCommand,
    @Res() res: Response
  ) {
    await this.commandBus.execute(command);

    res.status(HttpStatus.ACCEPTED).json({
      status: HttpStatus.ACCEPTED,
      message: "Booking request accepted",
      item: {
        id: command.id,
      },
    });
  }
}
