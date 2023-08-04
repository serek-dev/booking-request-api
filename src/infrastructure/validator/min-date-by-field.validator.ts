import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "MinDateByField" })
export class MinDateByFieldValidator implements ValidatorConstraintInterface {
  constructor(private readonly greaterThanField: string) {}

  defaultMessage(validationArguments?: ValidationArguments): string {
    const otherFieldValue = this.getOtherFieldValue(validationArguments);
    return `Date ${validationArguments?.property} = ${validationArguments?.value} must be greater than: ${this.greaterThanField} = ${otherFieldValue}.`;
  }

  validate(
    value: Date,
    validationArguments?: ValidationArguments
  ): Promise<boolean> | boolean {
    return value > this.getOtherFieldValue(validationArguments);
  }

  private getOtherFieldValue(validationArguments?: ValidationArguments): Date {
    let dateValue = new Date();

    Object.entries(validationArguments?.object ?? {}).find(([key, value]) => {
      if (key === this.greaterThanField && value instanceof Date) {
        dateValue = value;
        return true;
      }

      return false;
    });

    return dateValue;
  }
}
