import { nodePropertiesFromRef } from "@src/parse/utils";
import type { ArrayNode, ParseFunction } from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";

export const parseZodArrayDef: ParseFunction<any, ArrayNode> = (def, refs) => {
  // In Zod 4, array element is in def.element instead of def.type
  const childType = zodSelectorFunction(def.element._zod.def, {
    ...refs,
    path: [],
  });
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "array",
    childType,
    ...nodePropertiesFromRef(refs),
  };
};
