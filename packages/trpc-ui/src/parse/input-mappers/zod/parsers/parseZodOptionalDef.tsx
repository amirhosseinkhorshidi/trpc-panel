import type { ParseFunction, ParsedInputNode } from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";

export const parseZodOptionalDef: ParseFunction<any, ParsedInputNode> = (
  def,
  refs,
) => {
  const parsedInner = zodSelectorFunction(def.innerType._zod.def, refs);
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    ...parsedInner,
    optional: true,
  };
};
