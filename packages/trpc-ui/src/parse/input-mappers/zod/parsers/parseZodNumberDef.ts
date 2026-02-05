import { nodePropertiesFromRef } from "@src/parse/utils";
import type { NumberNode, ParseFunction } from "../../../parseNodeTypes";

export const parseZodNumberDef: ParseFunction<any, NumberNode> = (
  def,
  refs,
) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "number",
    ...nodePropertiesFromRef(refs),
  };
};
