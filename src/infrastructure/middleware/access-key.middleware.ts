import {
  ForbiddenException,
  Inject,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";

@Injectable()
export class AccessKeyMiddleware implements NestMiddleware {
  constructor(@Inject("ApiKey") private readonly key: string) {}

  use(req: any, res: any, next: () => void) {
    if (req.headers["authorization"] !== this.key) {
      throw new ForbiddenException();
    }

    next();
  }
}
