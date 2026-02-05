import { nodePropertiesFromRef } from "@src/parse/utils";
import type { BooleanNode, ParseFunction } from "../../../parseNodeTypes";

export const parseZodBooleanFieldDef: ParseFunction<any, BooleanNode> = (
  def,
  refs,
) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return { type: "boolean", ...nodePropertiesFromRef(refs) };
};
