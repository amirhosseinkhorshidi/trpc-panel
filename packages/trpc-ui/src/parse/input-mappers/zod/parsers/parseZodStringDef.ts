import { nodePropertiesFromRef } from "@src/parse/utils";
import type { ParseFunction, StringNode } from "../../../parseNodeTypes";

export const parseZodStringDef: ParseFunction<any, StringNode> = (
  def,
  refs,
) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "string",
    ...nodePropertiesFromRef(refs),
  };
};
