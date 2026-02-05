import { nodePropertiesFromRef } from "@src/parse/utils";
import type { EnumNode, ParseFunction } from "../../../parseNodeTypes";

export const parseZodEnumDef: ParseFunction<any, EnumNode> = (def, refs) => {
  // In Zod 4, both regular and native enums use def.entries
  // We use Object.values to get the runtime values
  // For regular enums: entries is { "a": "a" } so keys === values
  // For native enums: entries is { "ONE": "one" } so we want values
  const values = Object.values(def.entries) as string[];
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return { type: "enum", enumValues: values, ...nodePropertiesFromRef(refs) };
};
