import { zodSelectorFunction } from "@src/parse/input-mappers/zod/selector";
import type {
  ParseReferences,
  ParsedInputNode,
} from "@src/parse/parseNodeTypes";

export function parseZodEffectsDef(
  def: any,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  // In Zod 4, pipe/transform uses def.in for input schema
  // If it's a transform type, it might still use def.schema
  const schema = def.in || def.schema;
  return zodSelectorFunction(schema._zod.def, refs);
}
