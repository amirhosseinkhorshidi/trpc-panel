import { nodePropertiesFromRef } from "@src/parse/utils";
import type { LiteralNode, ParseFunction } from "../../../parseNodeTypes";

export const parseZodLiteralDef: ParseFunction<any, LiteralNode> = (
  def,
  refs,
) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "literal",
    // In Zod 4, literal values are stored in an array def.values[0]
    value: def.values[0],
    ...nodePropertiesFromRef(refs),
  };
};
