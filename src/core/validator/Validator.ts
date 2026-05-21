import type { GetValueFunction, Rule, Rules, ValidationErrors } from "./types";

export class Validator {
  private rules: Rules;

  constructor(rules: Rules) {
    this.rules = rules;
  }

  validate(form: Record<string, unknown>): ValidationErrors {
    const errors: ValidationErrors = {};

    const getValue: GetValueFunction = <T>(name: string) =>
      form[name] as T | undefined;

    for (const field in this.rules) {
      const value = form[field];

      for (const rule of this.rules[field]) {
        const error = rule(value, getValue, form);

        if (error) {
          errors[field] = error;
          break;
        }
      }
    }

    return errors;
  }

  validateField(
    field: string,
    form: Record<string, unknown>,
  ): string | undefined {
    const rules = this.rules[field];

    if (!rules) return undefined;

    const getValue: GetValueFunction = <T>(name: string) =>
      form[name] as T | undefined;
    const value = form[field];
    for (const rule of rules) {
      const error = rule(value, getValue, form);
      if (error) {
        return error;
      }
    }

    return undefined;
  }

  isValid(form: Record<string, unknown>): boolean {
    return Object.keys(this.validate(form)).length === 0;
  }
}


  