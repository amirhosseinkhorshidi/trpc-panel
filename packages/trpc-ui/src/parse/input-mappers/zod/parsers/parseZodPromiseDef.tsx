import { zodSelectorFunction } from "@src/parse/input-mappers/zod/selector";
import type {
  ParseReferences,
  ParsedInputNode,
} from "@src/parse/parseNodeTypes";

export function parseZodPromiseDef(
  def: any,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  // In Zod 4, promise uses def.innerType for the wrapped schema
  return zodSelectorFunction(def.innerType._zod.def, refs);
}
