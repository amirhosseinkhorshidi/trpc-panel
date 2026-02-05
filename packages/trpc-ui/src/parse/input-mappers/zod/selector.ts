import { parseZodBigIntDef } from "@src/parse/input-mappers/zod/parsers/parseZodBigIntDef";
import { parseZodBrandedDef } from "@src/parse/input-mappers/zod/parsers/parseZodBrandedDef";
import { parseZodDefaultDef } from "@src/parse/input-mappers/zod/parsers/parseZodDefaultDef";
import { parseZodEffectsDef } from "@src/parse/input-mappers/zod/parsers/parseZodEffectsDef";
import { parseZodNullDef } from "@src/parse/input-mappers/zod/parsers/parseZodNullDef";
import { parseZodNullableDef } from "@src/parse/input-mappers/zod/parsers/parseZodNullableDef";
import { parseZodOptionalDef } from "@src/parse/input-mappers/zod/parsers/parseZodOptionalDef";
import { parseZodPromiseDef } from "@src/parse/input-mappers/zod/parsers/parseZodPromiseDef";
import { parseZodUndefinedDef } from "@src/parse/input-mappers/zod/parsers/parseZodUndefinedDef";
import { parseZodUnionDef } from "@src/parse/input-mappers/zod/parsers/parseZodUnionDef";
import type { ParserSelectorFunction } from "../../parseNodeTypes";
import { parseZodArrayDef } from "./parsers/parseZodArrayDef";
import { parseZodBooleanFieldDef } from "./parsers/parseZodBooleanFieldDef";
import {
  type ZodDiscriminatedUnionDefUnversioned,
  parseZodDiscriminatedUnionDef,
} from "./parsers/parseZodDiscriminatedUnionDef";
import { parseZodEnumDef } from "./parsers/parseZodEnumDef";
import { parseZodLiteralDef } from "./parsers/parseZodLiteralDef";
import { parseZodNumberDef } from "./parsers/parseZodNumberDef";
import { parseZodObjectDef } from "./parsers/parseZodObjectDef";
import { parseZodStringDef } from "./parsers/parseZodStringDef";
import { parseZodVoidDef } from "./parsers/parseZodVoidDef";
import type { ZodDefWithType } from "./zod-types";

export const zodSelectorFunction: ParserSelectorFunction<ZodDefWithType> = (
  def,
  references,
) => {
  // const optional = isZodOptional(zodAny);
  // const unwrappedOptional = optional ? zodAny._zod.def.innerType : zodAny;
  // Please keep these in alphabetical order
  // In Zod 4, def.type is a string literal instead of def.typeName enum
  switch (def.type) {
    case "array":
      return parseZodArrayDef(def as any, references);
    case "boolean":
      return parseZodBooleanFieldDef(def as any, references);
    case "union":
      // Check if it's a discriminated union by looking for discriminator property
      if ("discriminator" in def) {
        return parseZodDiscriminatedUnionDef(
          def as unknown as ZodDiscriminatedUnionDefUnversioned,
          references,
        );
      }
      return parseZodUnionDef(def as any, references);
    case "enum":
      // In Zod 4, both regular enums and native enums have the same structure with def.entries
      // For regular enums, keys and values are the same
      // For native enums, we use the values
      // Since we can't reliably distinguish them, we use a parser that works for both
      return parseZodEnumDef(def as any, references);
    case "literal":
      return parseZodLiteralDef(def as any, references);
    case "number":
    case "int":
      return parseZodNumberDef(def as any, references);
    case "object":
      return parseZodObjectDef(def as any, references);
    case "optional":
      return parseZodOptionalDef(def as any, references);
    case "string":
      return parseZodStringDef(def as any, references);
    case "nullable":
      return parseZodNullableDef(def as any, references);
    case "bigint":
      return parseZodBigIntDef(def as any, references);
    case "branded":
      return parseZodBrandedDef(def as any, references);
    case "default":
      return parseZodDefaultDef(def as any, references);
    case "transform":
    case "pipe":
      // In Zod 4, effects are split into transform and pipe
      return parseZodEffectsDef(def as any, references);
    case "null":
      return parseZodNullDef(def as any, references);
    case "promise":
      return parseZodPromiseDef(def as any, references);
    case "undefined":
      return parseZodUndefinedDef(def as any, references);
    case "void":
      return parseZodVoidDef(def as any, references);
  }
  return { type: "unsupported", path: references.path };
};
