import { AccessKeyMiddleware } from "./access-key.middleware";
import { ForbiddenException } from "@nestjs/common";

describe("AccessKeyMiddleware", () => {
  it("should be defined", () => {
    expect(new AccessKeyMiddleware("123")).toBeDefined();
  });

  it("should fail on invalid api key", () => {
    // Given I have api key middleware with key 123
    const sut = new AccessKeyMiddleware("123");

    // And req with a different key
    const req = {
      headers: { authorization: "421" },
    };

    // When I use it
    // Then forbidden error should be thrown
    expect(() => {
      sut.use(req, {}, jest.fn());
    }).toThrow(ForbiddenException);
  });

  it("should fail on missing api key", () => {
    // Given I have api key middleware with key 123
    const sut = new AccessKeyMiddleware("123");

    // And req with no authorization header
    const req = {
      headers: {},
    };

    // When I use it,
    // Then forbidden error should be thrown
    expect(() => {
      sut.use(req, {}, jest.fn());
    }).toThrow(ForbiddenException);
  });
});
