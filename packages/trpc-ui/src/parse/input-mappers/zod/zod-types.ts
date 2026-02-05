// In Zod 4, defs have a `type` property with string literals instead of `typeName`
export type ZodDefWithType = { type: string } & Record<string, any>;
