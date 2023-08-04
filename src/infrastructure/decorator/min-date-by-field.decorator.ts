import { registerDecorator, ValidationOptions } from 'class-validator';
import { MinDateByFieldValidator } from '../validator/min-date-by-field.validator';

export function MinDateByField(
  greaterThanField: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'MinDateByField',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: new MinDateByFieldValidator(greaterThanField),
    });
  };
}
