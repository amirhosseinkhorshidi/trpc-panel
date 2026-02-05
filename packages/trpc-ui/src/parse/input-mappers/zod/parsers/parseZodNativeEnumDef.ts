import { nodePropertiesFromRef } from "@src/parse/utils";
import type { EnumNode, ParseFunction } from "../../../parseNodeTypes";

export const parseZodNativeEnumDef: ParseFunction<any, EnumNode> = (
  def,
  refs,
) => {
  // In Zod 4, native enums use def.entries instead of def.values
  const values = Object.values(def.entries) as string[];
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return { type: "enum", enumValues: values, ...nodePropertiesFromRef(refs) };
};
