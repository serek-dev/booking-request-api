import { Range } from "./range";

describe("Range", () => {
  it("should create a valid entity", () => {
    const sut = new Range(new Date(2019), new Date(2020));
    expect(sut.from).not.toBeNull();
    expect(sut.to).not.toBeNull();
  });

  it("should fail on date to less than from", () => {
    expect(() => new Range(new Date(), new Date(2010))).toThrow(Error);
  });
});
