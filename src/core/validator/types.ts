export type GetValueFunction = <T>(name: string) => T | undefined;

export type Rule = (
  value: unknown,
  getValue: GetValueFunction,
  form: Record<string, unknown>,
) => string | undefined;

export type Rules = Record<string, Rule[]>;

export type ValidationErrors = Record<string, string | undefined>;
