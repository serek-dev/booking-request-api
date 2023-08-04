export class Range {
  constructor(public readonly from: Date, public readonly to: Date) {
    if (to <= from) {
      throw new Error("Date to must be greater than date from");
    }
  }
}
